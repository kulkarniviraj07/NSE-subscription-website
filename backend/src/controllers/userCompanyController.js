const subscriptionRepository =
    require(
        "../repositories/subscriptionRepository"
    );

const userCompanyRepository =
    require(
        "../repositories/userCompanyRepository"
    );

async function getCompanies(
    req,
    res
) {

    try {

        const companies =

            await userCompanyRepository
                .getUserCompanies(

                    req.user.id

                );

        return res.json({

            success: true,

            companies

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
                    "Failed to fetch companies"

            });

    }

}

async function addCompany(
    req,
    res
) {

    try {

        const {
            companyId
        } = req.body;

        const subscription =

            await subscriptionRepository
                .findActiveByUser(

                    req.user.id

                );

        if (
            !subscription
        ) {

            return res
                .status(400)
                .json({

                    success: false,

                    message:
                        "No active subscription"

                });

        }

        const exists =

            await userCompanyRepository
                .alreadySelected(

                    req.user.id,

                    companyId

                );

        if (
            exists
        ) {

            return res
                .status(400)
                .json({

                    success: false,

                    message:
                        "Company already selected"

                });

        }

        const count =

            await userCompanyRepository
                .countUserCompanies(

                    req.user.id

                );

        if (
            count >=
            subscription.company_limit
        ) {

            return res
                .status(400)
                .json({

                    success: false,

                    message:
                        `Maximum ${subscription.company_limit} companies allowed`

                });

        }

        await userCompanyRepository
            .addCompany(

                req.user.id,

                companyId

            );

        return res.json({

            success: true,

            message:
                "Company added"

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
                    "Failed to add company"

            });

    }

}

async function removeCompany(
    req,
    res
) {

    try {

        const {
            companyId
        } = req.body;

        await userCompanyRepository
            .removeCompany(

                req.user.id,

                companyId

            );

        return res.json({

            success: true,

            message:
                "Company removed"

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
                    "Failed to remove company"

            });

    }

}

module.exports = {

    getCompanies,

    addCompany,

    removeCompany

};