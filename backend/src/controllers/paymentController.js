const crypto =
    require(
        "crypto"
    );

const paymentService =
    require(
        "../services/paymentService"
    );

const paymentRepository =
    require(
        "../repositories/paymentRepository"
    );

const subscriptionRepository =
    require(
        "../repositories/subscriptionRepository"
    );

async function createOrder(
    req,
    res
) {

    try {

        const order =

            await paymentService
                .createOrder();

        await paymentRepository
            .create(

                req.user.id,

                119,

                order.id

            );

        return res.json({

            success: true,

            order

        });

    }
    catch (err) {

        console.error(err);

        return res
            .status(500)
            .json({

                success: false,

                message:
                    "Order creation failed"

            });

    }

}

async function verifyPayment(
    req,
    res
) {

    try {

        const {

            razorpay_order_id,

            razorpay_payment_id,

            razorpay_signature

        } = req.body;

        const generatedSignature =

            crypto
                .createHmac(

                    "sha256",

                    process.env
                        .RAZORPAY_KEY_SECRET

                )

                .update(

                    `${razorpay_order_id}|${razorpay_payment_id}`

                )

                .digest(
                    "hex"
                );

        if (

            generatedSignature !==

            razorpay_signature

        ) {

            return res
                .status(400)
                .json({

                    success: false,

                    message:
                        "Invalid payment signature"

                });

        }

        await paymentRepository
            .markPaid(

                razorpay_order_id,

                razorpay_payment_id

            );

        await subscriptionRepository
            .deactivateActiveSubscription(

                req.user.id

            );

        const startDate =
            new Date();

        const endDate =
            new Date();

        endDate.setMonth(

            endDate.getMonth() + 1

        );

        await subscriptionRepository
            .create(

                req.user.id,

                2,

                "ACTIVE",

                startDate,

                endDate

            );

        return res.json({

            success: true,

            message:
                "Premium subscription activated"

        });

    }
    catch (err) {

        console.error(err);

        return res
            .status(500)
            .json({

                success: false,

                message:
                    "Payment verification failed"

            });

    }

}

module.exports = {

    createOrder,

    verifyPayment

};