require("dotenv").config();
const db = require("./src/config/database");

async function run() {
    try {
        await db.testConnection();
        const result = await db.query(
            "SELECT * FROM otp_verifications ORDER BY created_at DESC LIMIT 10"
        );
        console.log("RECENT OTP REQUESTS:");
        console.log(result.rows);
        process.exit(0);
    } catch (err) {
        console.error("ERROR:", err.message);
        process.exit(1);
    }
}

run();
