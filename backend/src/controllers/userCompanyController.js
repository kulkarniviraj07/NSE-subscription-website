const subscriptionRepository =
    require(
        "../repositories/subscriptionRepository"
    );

const userCompanyRepository =
    require(
        "../repositories/userCompanyRepository"
    );

// ── Per-mobile company-limit override ────────────────────────────────────
// Lets specific numbers (e.g. the owner/test accounts) keep a higher company
// limit than their plan allows, without hardcoding a personal phone number in
// this public repo. Configure in the environment:
//     COMPANY_LIMIT_OVERRIDE_MOBILES=7057004992,9876543210
//     COMPANY_LIMIT_OVERRIDE=150
// Empty (the default) = no overrides; everyone gets their plan's limit.

const OVERRIDE_MOBILES =

    (process.env.COMPANY_LIMIT_OVERRIDE_MOBILES || "")
        .split(",")
        .map(s => s.trim())
        .filter(Boolean)
        .map(normalizeMobile);

const OVERRIDE_LIMIT =

    parseInt(
        process.env.COMPANY_LIMIT_OVERRIDE || "150",
        10
    );

// Compare numbers consistently: strip spaces/+ and a leading 91 country code,
// so "+91 70570 04992", "917057004992" and "7057004992" all match.
function normalizeMobile(
    mobile
) {

    const digits =

        String(mobile || "")
            .replace(/\D/g, "");

    return digits.length === 12 && digits.startsWith("91")
        ? digits.slice(2)
        : digits;

}

function effectiveCompanyLimit(
    user,
    subscription
) {

    if (
        OVERRIDE_MOBILES.length &&
        Number.isFinite(OVERRIDE_LIMIT) &&
        OVERRIDE_MOBILES.includes(
            normalizeMobile(user && user.mobile)
        )
    ) {

        return OVERRIDE_LIMIT;

    }

    return subscription.company_limit;

}

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

        const limit =

            effectiveCompanyLimit(

                req.user,

                subscription

            );

        if (
            count >=
            limit
        ) {

            return res
                .status(400)
                .json({

                    success: false,

                    message:
                        `Maximum ${limit} companies allowed`

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