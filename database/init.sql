-- Create nse_ingestion for scraper
SELECT 'CREATE DATABASE nse_ingestion'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'nse_ingestion')\gexec

-- Create nse_subscription for user subscription portal
SELECT 'CREATE DATABASE nse_subscription'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'nse_subscription')\gexec
