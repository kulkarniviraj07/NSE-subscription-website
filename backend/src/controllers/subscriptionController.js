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

module.exports = {

    activateFreePlan,

    getCurrentSubscription

};