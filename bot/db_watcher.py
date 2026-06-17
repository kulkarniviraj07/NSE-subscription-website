# ============================================================
#  db_watcher.py  —  Poll your JS scraper's PostgreSQL DB
#                    and push new filings to WhatsApp subscribers
#
#  FIX: a filing is marked sent (SQLite) / notified (PG) ONLY after
#  whatsapp.send_pdf() confirms success. A failure caused by the
#  closed 24-hour window (131047) parks the filing in the
#  pending_filings retry queue instead of dropping it.
# ============================================================
import os
import sys
import time
import threading
import psycopg2
import psycopg2.extras
from concurrent.futures import ThreadPoolExecutor

import config
import database as bot_db
import whatsapp
from whatsapp import WhatsAppError


def get_pg_conn():
    """Connect to the JS scraper's PostgreSQL database."""
    return psycopg2.connect(
        host     = config.DB_HOST,
        port     = config.DB_PORT,
        dbname   = config.DB_NAME,
        user     = config.DB_USER,
        password = config.DB_PASSWORD,
        cursor_factory=psycopg2.extras.RealDictCursor,
    )


def ensure_schema():
    try:
        conn = get_pg_conn()
        cur  = conn.cursor()
        cur.execute("""
            ALTER TABLE announcements
            ADD COLUMN IF NOT EXISTS is_notified BOOLEAN DEFAULT FALSE
        """)
        conn.commit()
        cur.close()
        conn.close()
        print("✅ announcements.is_notified column ready.")
    except Exception as e:
        print(f"❌ Schema migration error: {e}")


def _dedup_by_filename(rows):
    """Keep only the first row per unique PDF filename."""
    seen   = []
    unique = []
    for row in rows:
        if not isinstance(row, dict):
            keys = ("id", "title", "local_path", "announcement_time")
            row  = dict(zip(keys, row))
        key = os.path.basename((row.get("local_path") or "").strip())
        if not key or key in seen:
            continue
        seen.append(key)
        unique.append(row)
    return unique


def fetch_new_filings():
    try:
        conn = get_pg_conn()
        cur  = conn.cursor()
        query = f"""
            SELECT
                {config.COL_ID}             AS filing_id,
                {config.COL_COMPANY_SYMBOL} AS symbol,
                {config.COL_COMPANY_NAME}   AS company_name,
                {config.COL_FILE_PATH}      AS file_path,
                {config.COL_FILING_TYPE}    AS filing_type,
                {config.COL_CREATED_AT}     AS created_at,
                EXTRACT(EPOCH FROM (NOW() - created_at))::int AS age_seconds
            FROM {config.FILINGS_TABLE}
            WHERE {config.COL_IS_SENT} = FALSE
              AND download_status = 'DOWNLOADED'
            ORDER BY {config.COL_CREATED_AT} ASC
        """
        cur.execute(query)
        rows = cur.fetchall()
        cur.close()
        conn.close()

        resolved = []
        for row in rows:
            row = dict(row)
            rel = row.get("file_path") or ""
            row["file_path"] = os.path.join(config.SCRAPER_BASE_PATH, rel.strip())
            resolved.append(row)
        return resolved

    except Exception as e:
        print(f"❌ PostgreSQL error while fetching filings: {e}")
        return []


def mark_notified_in_pg(filing_id):
    try:
        conn = get_pg_conn()
        cur  = conn.cursor()
        cur.execute(
            f"UPDATE {config.FILINGS_TABLE} SET {config.COL_IS_SENT} = TRUE WHERE {config.COL_ID} = %s",
            (filing_id,)
        )
        conn.commit()
        cur.close()
        conn.close()
    except Exception as e:
        print(f"❌ Could not mark filing {filing_id} as notified: {e}")


def unmark_notified_in_pg(filing_id):
    """Reset is_notified to FALSE so a failed delivery gets retried on the next poll."""
    try:
        conn = get_pg_conn()
        cur  = conn.cursor()
        cur.execute(
            f"UPDATE {config.FILINGS_TABLE} SET {config.COL_IS_SENT} = FALSE WHERE {config.COL_ID} = %s",
            (filing_id,)
        )
        conn.commit()
        cur.close()
        conn.close()
        print(f"↩️  Unmarked PG filing {filing_id} as notified (will retry).")
    except Exception as e:
        print(f"❌ Could not unmark filing {filing_id}: {e}")


def get_subscribers_for_symbol_pg(symbol: str) -> list:
    """Get active subscribers from the website's PostgreSQL database 'nse_subscription'."""
    try:
        conn = psycopg2.connect(
            host=config.DB_HOST,
            port=config.DB_PORT,
            dbname="nse_subscription",
            user=config.DB_USER,
            password=config.DB_PASSWORD
        )
        cur = conn.cursor()
        cur.execute("""
            SELECT u.mobile
            FROM user_companies uc
            JOIN users u ON u.id = uc.user_id
            JOIN companies c ON c.id = uc.company_id
            JOIN subscriptions s ON s.user_id = u.id
            WHERE UPPER(c.symbol) = UPPER(%s) AND s.status = 'ACTIVE';
        """, (symbol,))
        rows = cur.fetchall()
        cur.close()
        conn.close()

        phones = []
        for r in rows:
            p = r[0].strip()
            if len(p) == 10 and p.isdigit():
                p = "91" + p
            phones.append(p)
        return phones
    except Exception as e:
        print(f"❌ Error fetching PG subscribers for {symbol}: {e}")
        return []


# ── In-process AI summary engine ─────────────────────────────────────────────
# output.py sits next to this file and its deps (LangChain, pdfplumber, ...) are
# in the bot image. We import it ONCE and call process_pdf() in-process instead
# of spawning a fresh Python per PDF — the old subprocess paid ~10s of
# Python+LangChain startup on EVERY filing, which was the single biggest reason
# summaries were slow. In-process + parallel (see _caption_pool) lets the
# summary stay inside the one PDF caption and still land within ~1 minute.

_output_mod = None
_output_import_lock = threading.Lock()
_output_import_failed = False


def _get_output_module():
    """Import bot/output.py once (lazily) and cache the module (or the failure)."""
    global _output_mod, _output_import_failed
    if _output_mod is not None:
        return _output_mod
    if _output_import_failed:
        return None
    with _output_import_lock:
        if _output_mod is not None:
            return _output_mod
        if _output_import_failed:
            return None
        try:
            here = os.path.dirname(os.path.abspath(__file__))
            if here not in sys.path:
                sys.path.insert(0, here)
            import output as _out          # heavy import (LangChain) — paid once
            _output_mod = _out
            print("🤖 AI summary engine loaded (in-process).")
            return _out
        except Exception as e:
            print(f"⚠️ Could not load output.py in-process ({e}); summaries disabled.")
            _output_import_failed = True
            return None


def warm_up_summary_engine():
    """Pre-import the engine at startup so the first real filing isn't slowed."""
    try:
        _get_output_module()
    except Exception:
        pass


def _run_summary(file_path: str):
    out = _get_output_module()
    if out is None:
        return None
    msg = out.process_pdf(
        file_path,
        provider=getattr(config, "SUMMARY_PROVIDER", "openai"),
        model=getattr(config, "SUMMARY_MODEL", "gpt-4o-mini"),
    )
    if not msg:
        return None
    msg = msg.strip()
    if "*📢 PureFrame" in msg:
        return msg[msg.find("*📢 PureFrame"):]
    return msg or None


def generate_pdf_summary(file_path: str) -> str | None:
    """
    Generate the AI summary for one PDF, in-process, with a HARD timeout so a
    slow/hung LLM call can never stall delivery. Returns None on any failure
    (caller then sends the basic caption). Safe to run from several threads at
    once (the caption pool does exactly that).
    """
    print(f"🤖 Generating AI summary for {os.path.basename(file_path)}...")
    box = {}

    def _worker():
        try:
            box["value"] = _run_summary(file_path)
        except Exception as e:
            box["error"] = e

    t = threading.Thread(target=_worker, daemon=True)
    t.start()
    t.join(getattr(config, "SUMMARY_TIMEOUT_SEC", 35))

    if t.is_alive():
        print(f"⏱️  Summary timed out for {os.path.basename(file_path)} — sending basic caption.")
        return None
    if "error" in box:
        print(f"❌ Summary failed for {os.path.basename(file_path)}: {box['error']}")
        return None
    return box.get("value")


def _format_exchange_time(raw) -> str:
    """Format the NSE/BSE announcement timestamp for display in the message."""
    if not raw:
        return "time not available"
    s = str(raw).strip().replace("T", " ")
    # Drop fractional seconds / timezone noise (e.g. "2026-06-14 09:01:23.000").
    if "." in s:
        s = s.split(".")[0]
    return f"{s} IST"


def _caption_with_time(body: str, company: str, symbol: str, raw_time) -> str:
    """
    Build the SINGLE WhatsApp caption: company + exchange filing time, then the
    AI summary (or a basic fallback). The exchange time is added HERE, per-send,
    and is NEVER stored in the summary cache — so it can't be duplicated on
    re-sends. Capped at WhatsApp's 1024-char caption limit.
    """
    header = (
        f"🏢 *{company}* ({symbol})\n"
        f"🕒 Filed on exchange: {_format_exchange_time(raw_time)}"
    )
    caption = f"{header}\n\n{body}".strip()
    if len(caption) > 1024:
        caption = caption[:1021].rstrip() + "..."
    return caption


def _build_caption(file_path, fallback_caption):
    """
    Return the rich AI summary BODY (cached if already generated). Caches the
    time-less body only — the exchange time is added per-send by
    _caption_with_time, so it can never be doubled up.
    """
    file_key = os.path.basename(file_path).strip()
    cached   = bot_db.get_filing_summary(file_key)
    if cached:
        return cached

    ai_summary = generate_pdf_summary(file_path)
    if ai_summary:
        trimmed = ai_summary[:1017] + "..." if len(ai_summary) > 1020 else ai_summary
        bot_db.save_filing_summary(file_key, trimmed)
        return trimmed
    return fallback_caption


# ── Parallel single-message caption builder ──────────────────────────────────
# Summaries run IN-PROCESS (generate_pdf_summary) and SEVERAL AT ONCE here, so a
# burst of filings doesn't serialize into a long queue. This keeps the PDF +
# summary + exchange-time in ONE WhatsApp message AND within ~1 minute.

_caption_pool = ThreadPoolExecutor(
    max_workers=getattr(config, "SUMMARY_WORKERS", 6),
    thread_name_prefix="summary",
)


def _full_caption(company, symbol, filing_type, file_path, raw_time) -> str:
    """One-message caption = exchange time + AI summary (or basic fallback)."""
    fallback = (
        f"📄 *{company}* — {filing_type}\n"
        f"🏦 Symbol: {symbol}"
    )
    body = _build_caption(file_path, fallback)
    return _caption_with_time(body, company, symbol, raw_time)


def _try_send(phone, file_path, caption, file_key, filing_id=None,
              template_params=None, force_template=False):
    """
    Attempt one delivery.

    Tries free-form first; if the 24h window is closed, whatsapp.send_pdf falls
    back to the approved template (when configured). Returns True only on
    confirmed success (and marks it sent). If delivery still fails (e.g. no
    template configured, or template not yet approved) the filing is queued
    for retry. Never marks a filing sent on failure.

    force_template=True skips the free-form attempt and sends via template
    directly. Pass this when retrying after a 131047 callback — we already
    KNOW the window is closed, so re-trying free-form would just fail again
    asynchronously and loop forever.
    """
    try:
        # Attach the "Full Summary" quick-reply button payload so a tap comes
        # back as an inbound message (reopening the 24h window) — but ONLY if
        # the approved template actually has that button (config flag).
        reply_payload = None
        if getattr(config, "TEMPLATE_SUMMARY_BUTTON", False):
            reply_payload = f"SUM::{file_key}"
        channel, wamid = whatsapp.send_pdf(phone, file_path, caption=caption,
                                           template_params=template_params,
                                           force_template=force_template,
                                           reply_payload=reply_payload)
        bot_db.mark_filing_sent(phone, file_key)
        bot_db.remove_pending_filing(phone, file_key)  # clear any prior retry entry
        # Track the wamid so status callbacks can undo this if Meta later
        # reports 131047 (free-form accepted but not delivered).
        tracked = False
        if wamid:
            bot_db.store_wamid(wamid, phone, file_key, file_path, caption,
                               filing_id=filing_id, channel=channel)
            # Verify the row actually landed (guards against "table not ready" edge case).
            if bot_db.get_wamid_info(wamid):
                tracked = True
            else:
                print(f"⚠️  WAMID STORE FAILED for {phone} / {file_key} — "
                      f"status callbacks will not be able to retry this filing!")
        else:
            # Empty wamid means Meta's response had no messages[0].id.
            # The 131047 status callback will arrive later but cannot be matched.
            print(f"⚠️  EMPTY WAMID returned for {phone} / {file_key} ({channel}) — "
                  f"wamid tracking disabled for this send.")

        # ── SAFETY NET ──────────────────────────────────────────────────
        # If a FREE-FORM send could not be tracked, a later 131047 async
        # failure callback can't be matched back to this filing and would be
        # silently dropped. Park a recoverable copy in pending_filings so it
        # goes out the next time the user messages (which reopens the window).
        # Template sends deliver outside the window and won't get 131047, so
        # they don't need this.
        if not tracked and channel == "freeform":
            bot_db.queue_pending_filing(
                phone, file_key, file_path, caption,
                filing_id=filing_id,
                error="untracked freeform send (empty/failed wamid)"
            )
            print(f"   🛟 Parked {file_key} for {phone} in pending_filings "
                  f"(untracked send — recoverable on next inbound message).")
        return True
    except WhatsAppError as e:
        if e.is_reengagement:
            print(f"⏳ 24h window closed for {phone} — queued {file_key} for retry.")
            bot_db.queue_pending_filing(
                phone, file_key, file_path, caption,
                filing_id=filing_id, error="131047 re-engagement"
            )
        else:
            print(f"❌ WhatsApp send failed for {phone} ({file_key}): {e}")
            bot_db.queue_pending_filing(
                phone, file_key, file_path, caption,
                filing_id=filing_id, error=str(e)
            )
        return False
    except Exception as e:
        print(f"❌ Unexpected send error for {phone} ({file_key}): {e}")
        bot_db.queue_pending_filing(
            phone, file_key, file_path, caption,
            filing_id=filing_id, error=str(e)
        )
        return False


def process_new_filings():
    """
    Fetch new filings → build (exchange time + AI summary) captions for the
    whole batch CONCURRENTLY → deliver one WhatsApp message each.

    Building captions in parallel means a burst of N filings takes about as long
    as ONE summary, not N — so every PDF lands with its summary within ~1 minute
    instead of the later ones queuing for minutes.
    """
    filings = fetch_new_filings()
    filings = _dedup_by_filename(filings)
    if not filings:
        return

    # ── Phase 1: resolve subscribers / drop undeliverable filings ────────
    jobs = []
    for filing in filings:
        filing_id   = filing["filing_id"]
        symbol      = (filing.get("symbol") or "").upper().strip()
        company     = filing.get("company_name") or symbol
        file_path   = filing["file_path"]
        filing_type = filing.get("filing_type") or "New Filing"

        subscribers = get_subscribers_for_symbol_pg(symbol)
        if not subscribers:
            mark_notified_in_pg(filing_id)
            print(f"ℹ️  No subscribers for {symbol}, skipping.")
            continue

        if not os.path.exists(file_path):
            print(f"⚠️  File not found: {file_path} — marking to prevent loop.")
            file_key = os.path.basename(file_path).strip()
            for phone in subscribers:
                bot_db.mark_filing_sent(phone, file_key)
            mark_notified_in_pg(filing_id)
            continue

        jobs.append({
            "filing_id":   filing_id,
            "symbol":      symbol,
            "company":     company,
            "file_path":   file_path,
            "filing_type": filing_type,
            "raw_time":    filing.get("created_at"),
            "age_seconds": filing.get("age_seconds"),
            "subscribers": subscribers,
            "file_key":    os.path.basename(file_path).strip(),
        })

    if not jobs:
        return

    # ── Phase 2: build all captions concurrently (summary + exchange time) ─
    futures = {
        j["file_key"]: _caption_pool.submit(
            _full_caption, j["company"], j["symbol"], j["filing_type"],
            j["file_path"], j["raw_time"],
        )
        for j in jobs
    }

    # ── Phase 3: deliver ONE message per subscriber ──────────────────────
    for j in jobs:
        try:
            caption = futures[j["file_key"]].result()
        except Exception as e:
            print(f"❌ Caption build failed for {j['file_key']}: {e}")
            caption = _caption_with_time(
                f"📄 *{j['company']}* — {j['filing_type']}\n🏦 Symbol: {j['symbol']}",
                j["company"], j["symbol"], j["raw_time"],
            )

        age = j.get("age_seconds")
        age_note = f" [saved {age}s ago by scraper]" if age is not None else ""
        print(f"📤 Sending {j['symbol']} '{j['filing_type']}' to {len(j['subscribers'])} subscriber(s)...{age_note}")
        all_sent = True
        for phone in j["subscribers"]:
            if bot_db.is_filing_sent(phone, j["file_key"]):
                print(f"ℹ️  Already sent filing {j['file_key']} to {phone}, skipping.")
                continue
            # Only marks sent on confirmed success; queues on failure.
            ok = _try_send(phone, j["file_path"], caption, j["file_key"],
                           filing_id=j["filing_id"], template_params=[j["company"]])
            if not ok:
                all_sent = False

        # Mark notified in PG only when EVERY subscriber got it. Otherwise the
        # filing stays is_notified=FALSE and is retried on the next poll for
        # anyone still missing it (already-sent users are skipped above).
        if all_sent:
            mark_notified_in_pg(j["filing_id"])


# ── Automatic backfill for subscribers ───────────────────────

def deliver_backfill_for_subscribers():
    """
    For every active subscriber, ensure they have the latest filings for each
    company they're subscribed to. Idempotent — safe to run every poll.
    """
    try:
        sub_conn = psycopg2.connect(
            host=config.DB_HOST, port=config.DB_PORT,
            dbname="nse_subscription",
            user=config.DB_USER, password=config.DB_PASSWORD,
        )
        sub_cur = sub_conn.cursor()
        sub_cur.execute("""
            SELECT DISTINCT u.mobile
            FROM users u
            JOIN subscriptions s ON s.user_id = u.id
            WHERE s.status = 'ACTIVE';
        """)
        active_users = [r[0].strip() for r in sub_cur.fetchall()]

        pg_conn = get_pg_conn()
        pg_cur  = pg_conn.cursor()

        for raw_phone in active_users:
            phone = raw_phone
            if len(phone) == 10 and phone.isdigit():
                phone = "91" + phone
            normalized_phone = (
                phone[2:] if (phone.startswith("91") and len(phone) == 12) else phone
            )

            sub_cur.execute("""
                SELECT c.symbol, c.company_name, uc.created_at
                FROM user_companies uc
                JOIN companies c ON c.id = uc.company_id
                JOIN users u ON u.id = uc.user_id
                JOIN subscriptions s ON s.user_id = u.id
                WHERE (u.mobile = %s OR u.mobile = %s) AND s.status = 'ACTIVE';
            """, (phone, normalized_phone))
            subs = [(r[0], r[1], r[2]) for r in sub_cur.fetchall()]
            if not subs:
                continue

            for symbol, db_company_name, subscribed_at in subs:
                symbol = symbol.upper().strip()
                name = config.COMPANY_LIST.get(symbol, db_company_name or symbol)
                pg_cur.execute("""
                    SELECT id, title, local_path, announcement_time
                    FROM announcements
                    WHERE UPPER(company_symbol) = UPPER(%s)
                      AND download_status = 'DOWNLOADED'
                      AND announcement_time > %s
                    ORDER BY announcement_time ASC
                    LIMIT 50
                """, (symbol, subscribed_at))
                rows = _dedup_by_filename(pg_cur.fetchall())

                for row in rows:
                    file_path = os.path.join(
                        config.SCRAPER_BASE_PATH, row["local_path"].strip()
                    )
                    file_key = os.path.basename(file_path).strip()

                    if bot_db.is_filing_sent(phone, file_key):
                        continue
                    if not os.path.exists(file_path):
                        continue

                    # One message: exchange time + AI summary (cached after the
                    # first build, so repeated backfill passes are cheap).
                    caption = _full_caption(name, symbol, "New Filing",
                                            file_path, row['announcement_time'])

                    # Only marks sent on confirmed success; queues on failure.
                    if _try_send(phone, file_path, caption, file_key,
                                 filing_id=row["id"], template_params=[name]):
                        print(f"✅ Auto-delivered {file_key} to {phone}")

        pg_cur.close()
        pg_conn.close()
        sub_cur.close()
        sub_conn.close()
    except Exception as e:
        print(f"❌ Error in deliver_backfill_for_subscribers: {e}")


# ── Retry queue flush (called when a user re-opens the 24h window) ──

def flush_pending_filings(phone: str) -> int:
    """
    Re-attempt every parked filing for `phone`. Call this from the webhook
    handler whenever the user sends ANY inbound message — that message
    reopens the 24-hour window, so previously-blocked PDFs can now go out.

    Returns the number of filings successfully delivered.
    """
    pending = bot_db.get_pending_filings(phone)
    if not pending:
        return 0

    print(f"🔁 Flushing {len(pending)} pending filing(s) for {phone}...")
    delivered = 0
    for item in pending:
        file_path = item["file_path"]
        file_key  = item["file_key"]
        caption   = item.get("caption") or ""
        filing_id = item.get("filing_id")

        if not os.path.exists(file_path):
            # Source file gone — drop it from the queue to avoid a stuck loop.
            bot_db.remove_pending_filing(phone, file_key)
            continue

        if _try_send(phone, file_path, caption, file_key, filing_id=filing_id):
            delivered += 1
            # If the originating PG row is now fully delivered, mark it notified.
            if filing_id:
                mark_notified_in_pg(filing_id)

    return delivered


# Backwards-compatible alias
catch_up_new_subscribers = deliver_backfill_for_subscribers


# ── Background polling thread ────────────────────────────────

def start_watcher():
    """
    Run two INDEPENDENT background loops:

      1. live_loop      — the time-critical path. Polls for brand-new filings
                          (is_notified=FALSE) every POLL_INTERVAL_SEC and ships
                          them immediately. Nothing slow runs here, so a fresh
                          announcement goes out within ~1 minute of appearing.

      2. backfill_loop  — the slow subscriber catch-up (every subscriber ×
                          every company × latest PDFs). Heavy, so it runs on its
                          OWN thread on a long interval. It can take minutes
                          without ever delaying live delivery.

    Previously both ran in a single loop, so a long backfill sweep blocked new
    filings for up to an hour. Splitting them is the fix.
    """
    ensure_schema()

    def live_loop():
        print(f"⚡ Live dispatch started — checking for NEW filings every {config.POLL_INTERVAL_SEC}s")
        while True:
            try:
                process_new_filings()
            except Exception as e:
                print(f"❌ Live dispatch error: {e}")
            time.sleep(config.POLL_INTERVAL_SEC)

    def backfill_loop():
        interval = getattr(config, "BACKFILL_INTERVAL_SEC", 600)
        print(f"🪃 Subscriber backfill started — running every {interval}s (off the hot path)")
        while True:
            try:
                deliver_backfill_for_subscribers()
            except Exception as e:
                print(f"❌ Backfill task error: {e}")
            time.sleep(interval)

    # Warm the AI summary engine (one-time LangChain import) so the first real
    # filing isn't slowed by it.
    threading.Thread(target=warm_up_summary_engine, daemon=True, name="summary-warmup").start()
    threading.Thread(target=live_loop, daemon=True, name="live-dispatch").start()
    threading.Thread(target=backfill_loop, daemon=True, name="subscriber-backfill").start()