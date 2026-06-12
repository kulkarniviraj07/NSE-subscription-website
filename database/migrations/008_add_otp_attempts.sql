ALTER TABLE otp_verifications

    ADD COLUMN IF NOT EXISTS

        attempts INTEGER NOT NULL DEFAULT 0;
