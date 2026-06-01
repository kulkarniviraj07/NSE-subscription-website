CREATE TABLE companies (

    id BIGSERIAL PRIMARY KEY,

    symbol VARCHAR(50) UNIQUE NOT NULL,

    company_name VARCHAR(255) NOT NULL,

    created_at TIMESTAMP DEFAULT NOW()

);