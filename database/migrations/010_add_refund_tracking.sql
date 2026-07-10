-- ============================================================
-- Migration: Add refund tracking to payments
-- Run against: nse_subscription database
-- Safe to run multiple times (all changes are IF NOT EXISTS / additive).
-- Does not change any existing column, so the live product's own
-- code keeps working exactly as before.
-- ============================================================

ALTER TABLE payments
    ADD COLUMN IF NOT EXISTS refund_status VARCHAR(20) NOT NULL DEFAULT 'NONE';
    -- one of: NONE | PENDING | REFUNDED

ALTER TABLE payments
    ADD COLUMN IF NOT EXISTS refund_amount NUMERIC(10,2);

ALTER TABLE payments
    ADD COLUMN IF NOT EXISTS refund_notes TEXT;

ALTER TABLE payments
    ADD COLUMN IF NOT EXISTS refunded_at TIMESTAMP;

ALTER TABLE payments
    ADD COLUMN IF NOT EXISTS refund_updated_by VARCHAR(100);
    -- stores the central-dashboard username who last touched the refund state,
    -- purely for record keeping / audit purposes.

CREATE INDEX IF NOT EXISTS idx_payments_refund_status
    ON payments (refund_status);
