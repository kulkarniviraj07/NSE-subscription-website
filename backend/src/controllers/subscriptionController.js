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

        // TESTING MODE: no payment. Deactivate any current plan and grant
        // PREMIUM directly so testers can unlock the full company limit.
        const subscription =

            await subscriptionService
                .createPremiumSubscription(

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
                    "Failed to activate premium plan"

            });

    }

}

module.exports = {

    activateFreePlan,

    activatePremiumPlan,

    getCurrentSubscription

};