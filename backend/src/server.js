require("dotenv").config();

const app =
    require("./app");

const db =
    require("./config/database");

const PORT =
    process.env.PORT || 5000;

async function startServer() {

    try {

        if (
            !process.env.JWT_SECRET
        ) {

            throw new Error(
                "JWT_SECRET is not set. Add it to the backend .env file."
            );

        }

        if (
            !process.env.RAZORPAY_KEY_SECRET
        ) {

            console.warn(
                "Warning: RAZORPAY_KEY_SECRET is not set — payment verification will fail."
            );

        }

        await db.testConnection();

        app.listen(
            PORT,
            () => {

                console.log(
                    `Server running on port ${PORT}`
                );

            }
        );

    }
    catch (err) {

        console.error(
            "Server Startup Failed:",
            err.message
        );

        process.exit(1);

    }

}

startServer();