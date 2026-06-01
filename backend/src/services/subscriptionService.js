const planRepository =
    require(
        "../repositories/planRepository"
    );

const subscriptionRepository =
    require(
        "../repositories/subscriptionRepository"
    );

async function createFreeSubscription(
    userId
) {

    const plan =

        await planRepository
            .findById(
                1
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

module.exports = {

    createFreeSubscription

};