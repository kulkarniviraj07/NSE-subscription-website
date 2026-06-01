const db =
    require(
        "../config/database"
    );

async function getAll() {

    const result =
        await db.query(

            `
            SELECT *
            FROM plans
            ORDER BY price ASC
            `

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
            FROM plans
            WHERE id = $1
            `,

            [id]

        );

    return result.rows[0];

}

module.exports = {

    getAll,

    findById

};