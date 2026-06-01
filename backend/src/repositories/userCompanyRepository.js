const db =
    require(
        "../config/database"
    );

async function getUserCompanies(
    userId
) {

    const result =

        await db.query(

            `
            SELECT

                c.id,
                c.symbol,
                c.company_name

            FROM user_companies uc

            JOIN companies c

            ON c.id = uc.company_id

            WHERE uc.user_id = $1

            ORDER BY c.company_name
            `,

            [userId]

        );

    return result.rows;

}

async function countUserCompanies(
    userId
) {

    const result =

        await db.query(

            `
            SELECT COUNT(*)

            FROM user_companies

            WHERE user_id = $1
            `,

            [userId]

        );

    return Number(
        result.rows[0].count
    );

}

async function addCompany(
    userId,
    companyId
) {

    await db.query(

        `
        INSERT INTO user_companies (

            user_id,
            company_id

        )

        VALUES (

            $1,
            $2

        )
        `,

        [

            userId,
            companyId

        ]

    );

}

async function removeCompany(
    userId,
    companyId
) {

    await db.query(

        `
        DELETE FROM user_companies

        WHERE

            user_id = $1

        AND

            company_id = $2
        `,

        [

            userId,
            companyId

        ]

    );

}

async function alreadySelected(
    userId,
    companyId
) {

    const result =

        await db.query(

            `
            SELECT *

            FROM user_companies

            WHERE

                user_id = $1

            AND

                company_id = $2
            `,

            [

                userId,
                companyId

            ]

        );

    return result.rows.length > 0;

}

module.exports = {

    getUserCompanies,

    countUserCompanies,

    addCompany,

    removeCompany,

    alreadySelected

};