const db =
    require(
        "../config/database"
    );

async function findByMobile(
    mobile
) {

    const result =

        await db.query(

            `
            SELECT

                id,
                name,
                mobile

            FROM users

            WHERE mobile = $1
            `,

            [mobile]

        );

    return result.rows[0];

}

async function create(
    name,
    mobile
) {

    const result =

        await db.query(

            `
            INSERT INTO users (

                name,
                mobile

            )

            VALUES (

                $1,
                $2

            )

            RETURNING id, name, mobile
            `,

            [
                name,
                mobile
            ]

        );

    return result.rows[0];

}

module.exports = {

    findByMobile,

    create

};