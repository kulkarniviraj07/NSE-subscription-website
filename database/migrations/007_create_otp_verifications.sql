CREATE TABLE IF NOT EXISTS otp_verifications (

    id BIGSERIAL PRIMARY KEY,

    mobile VARCHAR(15) NOT NULL,

    otp_hash VARCHAR(255) NOT NULL,

    expires_at TIMESTAMP NOT NULL,

    verified BOOLEAN DEFAULT FALSE,

    created_at TIMESTAMP DEFAULT NOW()

);