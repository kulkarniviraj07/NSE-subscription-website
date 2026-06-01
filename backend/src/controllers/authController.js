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
async function sendOtp(
    req,
    res
) {

    try {

        const {
            mobile
        } = req.body;

        if (
            !mobile
        ) {

            return res
                .status(400)
                .json({

                    success: false,

                    message:
                        "Mobile number is required"

                });

        }

        const otp =

            await otpService
                .createOtp(
                    mobile
                );

        console.log(
            `OTP for ${mobile}: ${otp}`
        );

        return res.json({

            success: true,

            message:
                "OTP sent successfully"

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

        const {
            name,
            mobile,
            otp
        } = req.body;

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