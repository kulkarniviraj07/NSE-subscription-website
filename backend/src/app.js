const express =
    require("express");

const cors =
    require("cors");

const helmet =
    require("helmet");

const morgan =
    require("morgan");

const authRoutes =
    require(
        "./routes/authRoutes"
    );

const planRoutes =
    require(
        "./routes/planRoutes"
    );

const subscriptionRoutes =
    require(
        "./routes/subscriptionRoutes"
    );

const companyRoutes =
    require(
        "./routes/companyRoutes"
    );

const userCompanyRoutes =
    require(
        "./routes/userCompanyRoutes"
    );

const app =
    express();
const paymentRoutes =
    require(
        "./routes/paymentRoutes"
    );

/*
|--------------------------------------------------------------------------
| Middlewares
|--------------------------------------------------------------------------
*/

app.use(
    helmet()
);

app.use(
    cors()
);

app.use(
    express.json()
);

app.use(
    express.urlencoded({

        extended: true

    })
);

app.use(
    morgan("dev")
);
app.use(
    "/api/payments",
    paymentRoutes
);
/*
|--------------------------------------------------------------------------
| Health Check
|--------------------------------------------------------------------------
*/

app.get(

    "/health",

    (req, res) => {

        res.status(200).json({

            success: true,

            message:
                "Server Running"

        });

    }

);

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
*/

app.use(

    "/api/auth",

    authRoutes

);

app.use(

    "/api/plans",

    planRoutes

);

app.use(

    "/api/subscriptions",

    subscriptionRoutes

);

app.use(

    "/api/companies",

    companyRoutes

);

app.use(

    "/api/user",

    userCompanyRoutes

);

/*
|--------------------------------------------------------------------------
| 404 Handler
|--------------------------------------------------------------------------
*/

app.use(

    (req, res) => {

        res.status(404).json({

            success: false,

            message:
                "Route not found"

        });

    }

);

module.exports =
    app;