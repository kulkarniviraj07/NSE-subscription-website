const express =
    require("express");

const router =
    express.Router();

const authMiddleware =
    require(
        "../middlewares/authMiddleware"
    );

const subscriptionController =
    require(
        "../controllers/subscriptionController"
    );

router.post(

    "/free",

    authMiddleware,

    subscriptionController
        .activateFreePlan

);

router.post(

    "/premium",

    authMiddleware,

    subscriptionController
        .activatePremiumPlan

);

router.get(

    "/current",

    authMiddleware,

    subscriptionController
        .getCurrentSubscription

);

module.exports =
    router;