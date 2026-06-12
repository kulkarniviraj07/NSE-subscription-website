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

// Limit OTP dispatch to curb WhatsApp abuse and OTP flooding
const sendOtpLimiter =
    rateLimit({

        windowMs: 15 * 60 * 1000,

        limit: 5,

        standardHeaders: true,

        legacyHeaders: false,

        message: {

            success: false,

            message:
                "Too many OTP requests. Please try again after 15 minutes."

        }

    });

// Limit verification attempts to block brute-forcing the 6-digit OTP
const verifyOtpLimiter =
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

    "/send-otp",

    sendOtpLimiter,

    authController.sendOtp

);

router.post(

    "/verify-otp",

    verifyOtpLimiter,

    authController.verifyOtp

);

module.exports =
    router;
