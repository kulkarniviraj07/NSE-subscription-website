const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,

    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000
});

pool.on("connect", () => {
    console.log("PostgreSQL Connected");
});

pool.on("error", (err) => {
    console.error(
        "Unexpected PostgreSQL Error:",
        err.message
    );
});

async function testConnection() {
    try {

        const client =
            await pool.connect();

        await client.query(
            "SELECT NOW()"
        );

        // Idempotent safety net for migration 008 (OTP brute-force lockout).
        // Wrapped separately so a missing table on first deploy doesn't crash startup.
        try {
            await client.query(
                `ALTER TABLE otp_verifications
                 ADD COLUMN IF NOT EXISTS attempts INTEGER NOT NULL DEFAULT 0`
            );
        } catch (alterErr) {
            console.warn(
                "Schema patch skipped (table not ready yet):",
                alterErr.message
            );
        }

        client.release();

        console.log(
            "Database Connection Verified"
        );

    }
    catch (err) {

        console.error(
            "Database Connection Failed:",
            err.message
        );

        process.exit(1);

    }
}

module.exports = {
    pool,
    query: (text, params) =>
        pool.query(text, params),
    testConnection
};