const otpService =
    require(
        "../services/otpService"
    );

const userRepository =
    require(
        "../repositories/userRepository"
    );

const jwtUtil =
    require(
        "../utils/jwt"
    );

const { sendWhatsAppText } =
    require(
        "../utils/whatsappSender"
    );

/**
 * Normalize an Indian mobile number to its 10-digit form.
 * Accepts "9876543210", "+919876543210" or "919876543210".
 * Returns null when the input is not a valid mobile number.
 */
function normalizeMobile(
    input
) {

    if (
        typeof input !== "string" &&
        typeof input !== "number"
    ) {

        return null;

    }

    const digits =
        String(input).replace(/\D/g, "");

    if (
        digits.length === 10
    ) {

        return digits;

    }

    if (
        digits.length === 12 &&
        digits.startsWith("91")
    ) {

        return digits.slice(2);

    }

    return null;

}

async function sendOtp(
    req,
    res
) {

    try {

        const mobile =
            normalizeMobile(
                req.body.mobile
            );

        if (
            !mobile
        ) {

            return res
                .status(400)
                .json({

                    success: false,

                    message:
                        "A valid 10-digit mobile number is required"

                });

        }

        const otp =

            await otpService
                .createOtp(
                    mobile
                );

        // Send OTP via WhatsApp
        try {
            await sendWhatsAppText(
                mobile,
                `🔐 *EquityAlerts OTP Verification*\n\nYour one-time password is:\n\n*${otp}*\n\nThis OTP is valid for 5 minutes. Do not share it with anyone.`
            );
        } catch (waErr) {
            console.error(`❌ WhatsApp OTP send failed:`, waErr.message);

            return res
                .status(502)
                .json({

                    success: false,

                    message:
                        "Failed to send OTP. Please try again."

                });
        }

        return res.json({

            success: true,

            message: "OTP sent to your WhatsApp number",

        });

    }
    catch (err) {

        console.error(
            err
        );

        return res
            .status(500)
            .json({

                success: false,

                message:
                    "Failed to send OTP"

            });

    }

}


async function verifyOtp(
    req,
    res
) {

    try {

        const mobile =
            normalizeMobile(
                req.body.mobile
            );

        const otp =
            typeof req.body.otp === "string" ||
            typeof req.body.otp === "number"
                ? String(req.body.otp).trim()
                : "";

        if (
            !mobile ||
            !/^\d{6}$/.test(otp)
        ) {

            return res
                .status(400)
                .json({

                    success: false,

                    message:
                        "A valid mobile number and 6-digit OTP are required"

                });

        }

        let name =
            typeof req.body.name === "string"
                ? req.body.name.trim().slice(0, 100)
                : null;

        if (
            name === ""
        ) {

            name = null;

        }

        const valid =

            await otpService
                .verifyOtp(

                    mobile,

                    otp

                );

        if (
            !valid
        ) {

            return res
                .status(400)
                .json({

                    success: false,

                    message:
                        "Invalid OTP"

                });

        }

        let user =

            await userRepository
                .findByMobile(
                    mobile
                );

        if (
            !user
        ) {

            user =

                await userRepository
                    .create(

                        name,

                        mobile

                    );

        }

        const token =

            jwtUtil.generateToken(
                user
            );

        return res.json({

            success: true,

            message:
                "Verification successful",

            token,

            user

        });
    }
    catch (err) {

        console.error(
            err
        );

        return res
            .status(500)
            .json({

                success: false,

                message:
                    "Verification failed"

            });

    }

}

module.exports = {

    sendOtp,

    verifyOtp

};
