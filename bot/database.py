# ============================================================
#  database.py  —  SQLite for user subscriptions & states
#  (Separate from your JS scraper's PostgreSQL database)
#
#  ADDED: pending_filings table + helpers. When a send fails
#  because the 24-hour window is closed (error 131047), the
#  filing is parked here and re-sent the next time the user
#  messages the bot (which reopens the window).
# ============================================================
import sqlite3
import threading

import os
BOT_DB_PATH = os.environ.get("BOT_DB_PATH", "bot_data.db")
_lock = threading.Lock()


def get_conn():
    conn = sqlite3.connect(BOT_DB_PATH, check_same_thread=False)
    conn.row_factory = sqlite3.Row
    return conn


def _migrate_sent_filings(conn):
    """
    Detect and fix the legacy sent_filings schema (filing_id-only PK with no phone column,
    or phone added as plain column via ALTER TABLE). Drop and recreate with the correct
    composite PK (phone, filing_id) so per-user dedup works properly.
    """
    cur = conn.cursor()
    cur.execute("SELECT sql FROM sqlite_master WHERE type='table' AND name='sent_filings'")
    row = cur.fetchone()
    if row is None:
        return  # table doesn't exist yet — will be created below

    schema_sql = row[0] or ""
    if "PRIMARY KEY (phone, filing_id)" not in schema_sql:
        print("⚠️  sent_filings schema is outdated — migrating to (phone, filing_id) PK...")
        cur.execute("DROP TABLE IF EXISTS sent_filings")
        cur.execute("""
            CREATE TABLE sent_filings (
                phone     TEXT,
                filing_id TEXT,
                sent_at   DATETIME DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY (phone, filing_id)
            )
        """)
        conn.commit()
        print("✅ sent_filings migrated — old dedup records cleared (fresh start).")


def init_db():
    """Call once at startup to create tables."""
    with _lock:
        conn = get_conn()
        cur  = conn.cursor()

        _migrate_sent_filings(conn)

        cur.execute("""
            CREATE TABLE IF NOT EXISTS users (
                phone      TEXT PRIMARY KEY,
                state      TEXT DEFAULT 'idle',
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        """)

        cur.execute("""
            CREATE TABLE IF NOT EXISTS subscriptions (
                phone  TEXT,
                symbol TEXT,
                PRIMARY KEY (phone, symbol)
            )
        """)

        cur.execute("""
            CREATE TABLE IF NOT EXISTS sent_filings (
                phone     TEXT,
                filing_id TEXT,
                sent_at   DATETIME DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY (phone, filing_id)
            )
        """)

        # NEW: filings that could not be delivered (e.g. 24h window closed).
        # filing_id is the PG announcements.id when known (so we can mark
        # PG as notified later), or NULL for backfill-sourced rows.
        cur.execute("""
            CREATE TABLE IF NOT EXISTS pending_filings (
                phone      TEXT,
                file_key   TEXT,
                file_path  TEXT,
                caption    TEXT,
                filing_id  TEXT,
                attempts   INTEGER  DEFAULT 0,
                last_error TEXT,
                queued_at  DATETIME DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY (phone, file_key)
            )
        """)

        # Maps Meta wamid → filing so status callbacks can undo a false
        # "sent" marking when Meta later reports 131047 delivery failure.
        cur.execute("""
            CREATE TABLE IF NOT EXISTS wamid_tracking (
                wamid      TEXT PRIMARY KEY,
                phone      TEXT,
                file_key   TEXT,
                file_path  TEXT,
                caption    TEXT,
                filing_id  TEXT,
                channel    TEXT DEFAULT 'freeform',
                sent_at    DATETIME DEFAULT CURRENT_TIMESTAMP,
                handled_at DATETIME DEFAULT NULL
            )
        """)

        # Add `channel` to a pre-existing wamid_tracking table (older DBs).
        cols = [r[1] for r in cur.execute("PRAGMA table_info(wamid_tracking)").fetchall()]
        if "channel" not in cols:
            print("⚠️  Adding channel column to wamid_tracking...")
            cur.execute("ALTER TABLE wamid_tracking ADD COLUMN channel TEXT DEFAULT 'freeform'")

        # Caches the rich (free-form) AI summary per filing so it can be
        # re-sent verbatim when a silent subscriber taps the "Full Summary"
        # quick-reply button on the template (which reopens the 24h window).
        cur.execute("""
            CREATE TABLE IF NOT EXISTS filing_summaries (
                file_key   TEXT PRIMARY KEY,
                summary    TEXT,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        """)

        conn.commit()
        conn.close()
    print("✅ Bot SQLite database ready.")


# ── User state (tracks conversation step) ────────────────────

def get_state(phone: str) -> str:
    with _lock:
        conn = get_conn()
        row  = conn.execute("SELECT state FROM users WHERE phone=?", (phone,)).fetchone()
        conn.close()
        return row["state"] if row else "new"


def set_state(phone: str, state: str):
    with _lock:
        conn = get_conn()
        conn.execute("""
            INSERT INTO users (phone, state) VALUES (?, ?)
            ON CONFLICT(phone) DO UPDATE SET state=excluded.state
        """, (phone, state))
        conn.commit()
        conn.close()


# ── Subscriptions ─────────────────────────────────────────────

def get_subscriptions(phone: str) -> list:
    with _lock:
        conn = get_conn()
        rows = conn.execute(
            "SELECT symbol FROM subscriptions WHERE phone=?", (phone,)
        ).fetchall()
        conn.close()
        return [r["symbol"] for r in rows]


def add_subscription(phone: str, symbol: str):
    with _lock:
        conn = get_conn()
        conn.execute(
            "INSERT OR IGNORE INTO subscriptions (phone, symbol) VALUES (?, ?)",
            (phone, symbol)
        )
        conn.commit()
        conn.close()


def remove_subscription(phone: str, symbol: str):
    with _lock:
        conn = get_conn()
        conn.execute(
            "DELETE FROM subscriptions WHERE phone=? AND symbol=?",
            (phone, symbol)
        )
        conn.commit()
        conn.close()


def get_subscribers_for_symbol(symbol: str) -> list:
    """Returns all phone numbers subscribed to a given company symbol."""
    with _lock:
        conn  = get_conn()
        rows  = conn.execute(
            "SELECT phone FROM subscriptions WHERE symbol=?", (symbol,)
        ).fetchall()
        conn.close()
        return [r["phone"] for r in rows]


# ── Sent filings tracker ──────────────────────────────────────

def is_filing_sent(phone: str, filing_id: str) -> bool:
    """Returns True if this filing was already sent to this specific phone."""
    with _lock:
        conn = get_conn()
        row  = conn.execute(
            "SELECT 1 FROM sent_filings WHERE phone=? AND filing_id=?",
            (phone, str(filing_id))
        ).fetchone()
        conn.close()
        return row is not None


def mark_filing_sent(phone: str, filing_id: str):
    """Mark a filing as sent to a specific phone number."""
    with _lock:
        conn = get_conn()
        conn.execute(
            "INSERT OR IGNORE INTO sent_filings (phone, filing_id) VALUES (?, ?)",
            (phone, str(filing_id))
        )
        conn.commit()
        conn.close()


# ── Pending (retry) queue ─────────────────────────────────────

def queue_pending_filing(phone: str, file_key: str, file_path: str,
                         caption: str = "", filing_id=None, error: str = ""):
    """
    Park a filing that could not be delivered (e.g. 24-hour window closed).
    Idempotent on (phone, file_key); bumps the attempt counter on re-queue.
    """
    with _lock:
        conn = get_conn()
        conn.execute("""
            INSERT INTO pending_filings
                (phone, file_key, file_path, caption, filing_id, attempts, last_error)
            VALUES (?, ?, ?, ?, ?, 1, ?)
            ON CONFLICT(phone, file_key) DO UPDATE SET
                attempts   = pending_filings.attempts + 1,
                last_error = excluded.last_error,
                caption    = excluded.caption,
                file_path  = excluded.file_path,
                filing_id  = COALESCE(excluded.filing_id, pending_filings.filing_id)
        """, (phone, file_key, file_path, caption,
              str(filing_id) if filing_id is not None else None, error))
        conn.commit()
        conn.close()


def get_pending_filings(phone: str) -> list:
    """Return all pending (undelivered) filings for a phone, oldest first."""
    with _lock:
        conn = get_conn()
        rows = conn.execute(
            "SELECT * FROM pending_filings WHERE phone=? ORDER BY queued_at ASC",
            (phone,)
        ).fetchall()
        conn.close()
        return [dict(r) for r in rows]


def remove_pending_filing(phone: str, file_key: str):
    """Remove a filing from the retry queue once it has been delivered."""
    with _lock:
        conn = get_conn()
        conn.execute(
            "DELETE FROM pending_filings WHERE phone=? AND file_key=?",
            (phone, file_key)
        )
        conn.commit()
        conn.close()


def is_filing_pending(phone: str, file_key: str) -> bool:
    with _lock:
        conn = get_conn()
        row  = conn.execute(
            "SELECT 1 FROM pending_filings WHERE phone=? AND file_key=?",
            (phone, file_key)
        ).fetchone()
        conn.close()
        return row is not None


# ── Sent filings: undo helper ─────────────────────────────────

def unmark_filing_sent(phone: str, filing_id: str):
    """Remove a filing from sent_filings so it can be retried."""
    with _lock:
        conn = get_conn()
        conn.execute(
            "DELETE FROM sent_filings WHERE phone=? AND filing_id=?",
            (phone, str(filing_id))
        )
        conn.commit()
        conn.close()


# ── wamid tracking (status callback support) ─────────────────

def store_wamid(wamid: str, phone: str, file_key: str,
                file_path: str, caption: str, filing_id=None,
                channel: str = "freeform"):
    """Store a Meta message ID → filing mapping for status callback lookups.

    `channel` records HOW this message was sent ('freeform' or 'template') so
    the status-callback handler can avoid retrying a failed template as yet
    another template (which would never succeed and would loop forever).
    """
    with _lock:
        conn = get_conn()
        conn.execute("""
            INSERT OR REPLACE INTO wamid_tracking
                (wamid, phone, file_key, file_path, caption, filing_id, channel)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        """, (wamid, phone, file_key, file_path, caption,
              str(filing_id) if filing_id is not None else None, channel))
        conn.commit()
        conn.close()


def get_wamid_info(wamid: str):
    """Return the filing info for a wamid, or None if not tracked or already handled."""
    with _lock:
        conn = get_conn()
        row  = conn.execute(
            "SELECT * FROM wamid_tracking WHERE wamid=? AND handled_at IS NULL",
            (wamid,)
        ).fetchone()
        conn.close()
        return dict(row) if row else None


def remove_wamid(wamid: str):
    """
    Soft-delete: mark wamid as handled rather than deleting it immediately.
    This prevents duplicate webhook events (Meta re-delivers occasionally)
    from losing the tracking info before the second callback is processed.
    Rows older than 30 minutes are fully pruned on each call.
    """
    with _lock:
        conn = get_conn()
        # Soft-delete this wamid.
        conn.execute(
            "UPDATE wamid_tracking SET handled_at = CURRENT_TIMESTAMP WHERE wamid = ?",
            (wamid,)
        )
        # Hard-delete rows handled more than 30 minutes ago (cleanup).
        conn.execute("""
            DELETE FROM wamid_tracking
            WHERE handled_at IS NOT NULL
              AND handled_at <= datetime('now', '-30 minutes')
        """)
        conn.commit()
        conn.close()


# ── Filing summary cache (for the "Full Summary" button) ─────

def save_filing_summary(file_key: str, summary: str):
    """Cache the rich AI summary for a filing so a button tap can re-send it."""
    if not file_key or not summary:
        return
    with _lock:
        conn = get_conn()
        conn.execute("""
            INSERT INTO filing_summaries (file_key, summary) VALUES (?, ?)
            ON CONFLICT(file_key) DO UPDATE SET summary=excluded.summary
        """, (file_key, summary))
        conn.commit()
        conn.close()


def get_filing_summary(file_key: str):
    """Return the cached rich summary for a filing, or None."""
    with _lock:
        conn = get_conn()
        row  = conn.execute(
            "SELECT summary FROM filing_summaries WHERE file_key=?", (file_key,)
        ).fetchone()
        conn.close()
        return row["summary"] if row else None