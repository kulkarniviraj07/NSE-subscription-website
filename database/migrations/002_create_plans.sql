CREATE TABLE IF NOT EXISTS plans (

    id BIGSERIAL PRIMARY KEY,

    name VARCHAR(50) UNIQUE NOT NULL,

    price NUMERIC(10,2) NOT NULL,

    company_limit INTEGER NOT NULL,

    duration_days INTEGER NOT NULL,

    created_at TIMESTAMP DEFAULT NOW()

);