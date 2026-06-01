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