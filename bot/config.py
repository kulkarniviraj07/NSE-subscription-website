# ============================================================
#  config.py  —  Fill these before running the bot
# ============================================================

import os

# ── Step 1: Meta / WhatsApp Cloud API ────────────────────────
# Get from: developers.facebook.com → Your App → WhatsApp → API Setup
WHATSAPP_TOKEN   = os.environ.get("WHATSAPP_TOKEN", "")   # Set via environment / Coolify — never hardcode (it leaks in git)
PHONE_NUMBER_ID  = os.environ.get("PHONE_NUMBER_ID", "1094754613731490")          # Looks like: 123456789012345
VERIFY_TOKEN     = os.environ.get("VERIFY_TOKEN", "nse_bot_secret_2024")           # Any string you choose (used once for webhook setup)

# ── Step 2: Your PostgreSQL DB (JS scraper's database) ───────
DB_HOST     = os.environ.get("DB_HOST", "localhost")
DB_PORT     = int(os.environ.get("DB_PORT", 5433))
DB_NAME     = os.environ.get("DB_NAME", "nse_ingestion")
DB_USER     = os.environ.get("DB_USER", "postgres")
DB_PASSWORD = os.environ.get("DB_PASSWORD", "")   # Set via environment / Coolify

# ── Step 3: PostgreSQL table/column names — matched to real scraper schema ───────
# Table: announcements
# Real columns: id, company_symbol, title, pdf_url, local_path, announcement_time, download_status, is_notified
FILINGS_TABLE        = "announcements"
COL_ID               = "id"
COL_COMPANY_SYMBOL   = "company_symbol"
COL_COMPANY_NAME     = "company_symbol"   # no separate display name column — symbol used
COL_FILE_PATH        = "local_path"       # relative path e.g. storage/pdf/TCS_2024-01-01.pdf
COL_FILING_TYPE      = "title"            # announcement description
COL_CREATED_AT       = "announcement_time"
COL_IS_SENT          = "is_notified"      # bot sets TRUE after sending

# Absolute path to the Node.js scraper root so relative local_path can be resolved
SCRAPER_BASE_PATH    = os.environ.get("SCRAPER_BASE_PATH", r"d:\prathmesh\shares\nse-announcement-downloader v2")

# ── Step 4: Bot settings ─────────────────────────────────────
FLASK_PORT        = int(os.environ.get("FLASK_PORT", 5000))
FLASK_DEBUG       = os.environ.get("FLASK_DEBUG", "False").lower() in ("true", "1", "yes")
ENABLE_DB_WATCHER = os.environ.get("ENABLE_DB_WATCHER", "True").lower() in ("true", "1", "yes")
POLL_INTERVAL_SEC = int(os.environ.get("POLL_INTERVAL_SEC", 15))    # Live dispatch: check for brand-new filings every 15s (time-critical path)

# How often the SLOW subscriber catch-up/backfill runs. This task is heavy
# (every subscriber × every company × latest PDFs) so it runs on its OWN thread,
# on a long interval, and must NEVER block the live dispatch above. Keeping it
# off the hot path is what makes new announcements go out within ~1 minute
# instead of being stuck behind a long backfill sweep.
BACKFILL_INTERVAL_SEC = int(os.environ.get("BACKFILL_INTERVAL_SEC", 600))   # 10 minutes

# Max seconds to wait for the LLM PDF summary subprocess. Kept short so a slow
# or hung summary can never delay PDF delivery past the "within a minute" goal —
# on timeout we fall back to the basic caption and still send the PDF instantly.
SUMMARY_TIMEOUT_SEC = int(os.environ.get("SUMMARY_TIMEOUT_SEC", 30))

# ── Step 5: WhatsApp Message Template (delivery OUTSIDE the 24h window) ──
# Meta only allows pushing a PDF to a user who has NOT messaged you in the last
# 24 hours via an APPROVED template that has a DOCUMENT header. This is what
# makes the bot deliver filings to silent subscribers.
#
# Setup (Meta WhatsApp Manager → Message Templates):
#   1. Create a template, category "Utility".
#   2. Header: type = Document.
#   3. Body: your alert text. Use {{1}}, {{2}}, ... for any dynamic fields.
#   4. Submit for approval, then put the exact name + language code below.
#
# Leave TEMPLATE_NAME = "" to disable the fallback (filings will instead be
# queued and delivered the next time the user messages the bot).
TEMPLATE_NAME             = "nse_bot"        # e.g. "nse_filing_alert" (must be APPROVED)
TEMPLATE_LANG             = "en"      # must match the template's language code ("en", "en_US", ...)
TEMPLATE_BODY_PARAM_COUNT = 1         # number of {{n}} variables in the template BODY (0 if none)
TEMPLATE_SUMMARY_BUTTON = True   # set True ONLY after the button is approved
# ── Companies users can subscribe to ─────────────────────────
# Key = NSE symbol, Value = display name shown in bot menu
COMPANY_LIST = {
    # ── Large Cap / Nifty 50 ──────────────────────────────────
    "HDFCBANK":   "HDFC Bank",
    "TCS":        "Tata Consultancy Services",
    "INFY":       "Infosys",
    "RELIANCE":   "Reliance Industries",
    "WIPRO":      "Wipro",
    "ICICIBANK":  "ICICI Bank",
    "SBIN":       "State Bank of India",
    "AXISBANK":   "Axis Bank",
    "KOTAKBANK":  "Kotak Mahindra Bank",
    "BAJFINANCE": "Bajaj Finance",
    "HINDUNILVR": "Hindustan Unilever",
    "ITC":        "ITC Limited",
    "LT":         "Larsen & Toubro",
    "TITAN":      "Titan Company",
    "MARUTI":     "Maruti Suzuki",
    "BHARTIARTL": "Bharti Airtel",
    "HCLTECH":    "HCL Technologies",
    "TECHM":      "Tech Mahindra",
    "SUNPHARMA":  "Sun Pharmaceutical",
    "TATAMOTORS": "Tata Motors",
    "TATASTEEL":  "Tata Steel",
    "JSWSTEEL":   "JSW Steel",
    "NTPC":       "NTPC Limited",
    "POWERGRID":  "Power Grid Corp",
    "ONGC":       "Oil & Natural Gas Corp",
    "COALINDIA":  "Coal India",
    "BAJAJFINSV": "Bajaj Finserv",
    "ADANIENT":   "Adani Enterprises",
    "ADANIPORTS": "Adani Ports",
    "ASIANPAINT": "Asian Paints",
    "NESTLEIND":  "Nestle India",
    "ULTRACEMCO": "UltraTech Cement",
    "GRASIM":     "Grasim Industries",
    "INDUSINDBK": "IndusInd Bank",
    "HDFCLIFE":   "HDFC Life Insurance",
    "SBILIFE":    "SBI Life Insurance",
    "CIPLA":      "Cipla",
    "DRREDDY":    "Dr. Reddy's Laboratories",
    "DIVISLAB":   "Divi's Laboratories",
    "EICHERMOT":  "Eicher Motors",
    "HEROMOTOCO": "Hero MotoCorp",
    "BRITANNIA":  "Britannia Industries",
    "APOLLOHOSP": "Apollo Hospitals",
    "TRENT":      "Trent Limited",
    "PIDILITIND": "Pidilite Industries",
    # ── Mid Cap ───────────────────────────────────────────────
    "BEL":        "Bharat Electronics",
    "HAL":        "Hindustan Aeronautics",
    "DABUR":      "Dabur India",
    "SIEMENS":    "Siemens India",
    "WOCKPHARMA": "Wockhardt Pharma",
}