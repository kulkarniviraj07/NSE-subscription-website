const express =
    require("express");

const rateLimit =
    require("express-rate-limit");

const router =
    express.Router();

const authController =
    require(
        "../controllers/authController"
    );

// Limit token-verification attempts to block replay / brute-force
const verifyTokenLimiter =
    rateLimit({

        windowMs: 15 * 60 * 1000,

        limit: 10,

        standardHeaders: true,

        legacyHeaders: false,

        message: {

            success: false,

            message:
                "Too many verification attempts. Please try again after 15 minutes."

        }

    });

router.post(

    "/verify-token",

    verifyTokenLimiter,

    authController.verifyToken

);

// ─────────────────────────────────────────────────────────────────────────
// TEMPORARY — Razorpay test-mode login (username/password).
// Remove this route along with authController.loginWithTestCredentials
// once Razorpay's testing is complete.
// ─────────────────────────────────────────────────────────────────────────
const testLoginLimiter =
    rateLimit({

        windowMs: 15 * 60 * 1000,

        limit: 10,

        standardHeaders: true,

        legacyHeaders: false,

        message: {

            success: false,

            message:
                "Too many login attempts. Please try again after 15 minutes."

        }

    });

router.post(

    "/login-test",

    testLoginLimiter,

    authController.loginWithTestCredentials

);

module.exports =
    router;
