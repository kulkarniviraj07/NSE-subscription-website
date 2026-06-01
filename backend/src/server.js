require("dotenv").config();

const app =
    require("./app");

const db =
    require("./config/database");

const PORT =
    process.env.PORT || 5000;

async function startServer() {

    try {

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