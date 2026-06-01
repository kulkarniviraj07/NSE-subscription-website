const companyRepository =
    require(
        "../repositories/companyRepository"
    );

async function getCompanies(
    req,
    res
) {

    try {

        const companies =

            await companyRepository
                .getAll();

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

async function searchCompanies(
    req,
    res
) {

    try {

        const q =
            req.query.q || "";

        const companies =

            await companyRepository
                .search(
                    q
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
                    "Search failed"

            });

    }

}

module.exports = {

    getCompanies,

    searchCompanies

};