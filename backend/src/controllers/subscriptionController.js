const subscriptionService =
    require(
        "../services/subscriptionService"
    );

const subscriptionRepository =
    require(
        "../repositories/subscriptionRepository"
    );

async function activateFreePlan(
    req,
    res
) {

    try {

        const existing =

            await subscriptionRepository
                .findActiveByUser(

                    req.user.id

                );

        if (
            existing
        ) {

            return res
                .status(400)
                .json({

                    success: false,

                    message:
                        "You already have an active subscription"

                });

        }

        const subscription =

            await subscriptionService
                .createFreeSubscription(

                    req.user.id

                );

        return res.json({

            success: true,

            subscription

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
                    "Failed to activate plan"

            });

    }

}

async function getCurrentSubscription(
    req,
    res
) {

    const subscription =

        await subscriptionRepository
            .findActiveByUser(

                req.user.id

            );

    return res.json({

        success: true,

        subscription

    });

}

async function activatePremiumPlan(
    req,
    res
) {

    try {

        // Premium without a Razorpay payment is allowed ONLY with a valid
        // 100%-off coupon. (Paid purchases go through paymentController.)
        const coupon =
            String(req.body.coupon || "").trim().toUpperCase();

        const validCoupon =
            String(process.env.PREMIUM_COUPON_100 || "PUREFRAME100")
                .trim()
                .toUpperCase();

        if (!coupon || coupon !== validCoupon) {

            return res
                .status(400)
                .json({

                    success: false,

                    message:
                        "Invalid or missing coupon code"

                });

        }

        // Deactivate any current plan and grant PREMIUM.
        const subscription =

            await subscriptionService
                .createPremiumSubscription(

                    req.user.id

                );

        return res.json({

            success: true,

            subscription,

            message:
                "Premium activated with coupon"

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
                    "Failed to activate premium plan"

            });

    }

}

module.exports = {

    activateFreePlan,

    activatePremiumPlan,

    getCurrentSubscription

};