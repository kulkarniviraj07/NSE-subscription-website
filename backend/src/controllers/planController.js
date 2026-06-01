const planRepository =
    require(
        "../repositories/planRepository"
    );

async function getPlans(
    req,
    res
) {

    try {

        const plans =

            await planRepository
                .getAll();

        return res.json({

            success: true,

            plans

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
                    "Failed to fetch plans"

            });

    }

}

module.exports = {

    getPlans

};