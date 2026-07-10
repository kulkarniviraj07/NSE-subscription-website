const planRepository =
    require(
        "../repositories/planRepository"
    );

const subscriptionRepository =
    require(
        "../repositories/subscriptionRepository"
    );

const FREE_PLAN_ID = 1;
const PREMIUM_PLAN_ID = 2;

async function createFreeSubscription(
    userId
) {

    const plan =

        await planRepository
            .findById(
                FREE_PLAN_ID
            );

    const startDate =
        new Date();

    const endDate =
        new Date();

    endDate.setFullYear(

        endDate.getFullYear() + 10

    );

    return subscriptionRepository.create(

        userId,

        plan.id,

        "ACTIVE",

        startDate,

        endDate

    );

}

/**
 * Activate PREMIUM directly, WITHOUT a payment step.
 *
 * TESTING MODE: payment is bypassed so testers can unlock the full
 * premium plan instantly. Mirrors the post-payment activation in
 * paymentController.verifyPayment — deactivate any current subscription,
 * then create a fresh ACTIVE premium subscription for `duration_days`.
 *
 * To re-enable real payments, route premium activation back through the
 * Razorpay verifyPayment flow instead of calling this.
 */
async function createPremiumSubscription(
    userId
) {

    const plan =

        await planRepository
            .findById(
                PREMIUM_PLAN_ID
            );

    await subscriptionRepository
        .deactivateActiveSubscription(
            userId
        );

    const startDate =
        new Date();

    const endDate =
        new Date();

    endDate.setDate(

        endDate.getDate() +

        Number(
            (plan && plan.duration_days) || 30
        )

    );

    return subscriptionRepository.create(

        userId,

        PREMIUM_PLAN_ID,

        "ACTIVE",

        startDate,

        endDate

    );

}

module.exports = {

    createFreeSubscription,

    createPremiumSubscription

};
