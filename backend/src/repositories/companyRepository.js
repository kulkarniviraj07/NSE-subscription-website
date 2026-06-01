const db =
    require(
        "../config/database"
    );

async function getAll() {

    const result =

        await db.query(

            `
            SELECT

                id,
                symbol,
                company_name

            FROM companies

            ORDER BY company_name
            `

        );

    return result.rows;

}

async function search(
    query
) {

    const result =

        await db.query(

            `
            SELECT

                id,
                symbol,
                company_name

            FROM companies

            WHERE

                symbol ILIKE $1

            OR

                company_name ILIKE $1

            ORDER BY company_name

            LIMIT 50
            `,

            [
                `%${query}%`
            ]

        );

    return result.rows;

}

async function findById(
    id
) {

    const result =

        await db.query(

            `
            SELECT *

            FROM companies

            WHERE id = $1
            `,

            [id]

        );

    return result.rows[0];

}

module.exports = {

    getAll,

    search,

    findById

};