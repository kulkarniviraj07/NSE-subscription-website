const db =
    require(
        "../config/database"
    );

async function create(
    userId,
    planId,
    status,
    startDate,
    endDate
) {

    const result =

        await db.query(

            `
            INSERT INTO subscriptions (

                user_id,
                plan_id,
                status,
                start_date,
                end_date

            )

            VALUES (

                $1,
                $2,
                $3,
                $4,
                $5

            )

            RETURNING *
            `,

            [

                userId,
                planId,
                status,
                startDate,
                endDate

            ]

        );

    return result.rows[0];

}

async function findActiveByUser(
    userId
) {

    const result =

        await db.query(

            `
            SELECT

                s.*,

                p.name,

                p.company_limit,

                p.price

            FROM subscriptions s

            JOIN plans p

            ON p.id = s.plan_id

            WHERE

                s.user_id = $1

            AND

                s.status = 'ACTIVE'

            ORDER BY s.id DESC

            LIMIT 1
            `,

            [userId]

        );

    return result.rows[0];

}

async function deactivateActiveSubscription(
    userId
) {

    await db.query(

        `
        UPDATE subscriptions

        SET status = 'INACTIVE'

        WHERE

            user_id = $1

        AND

            status = 'ACTIVE'
        `,

        [userId]

    );

}

module.exports = {

    create,

    findActiveByUser,

    deactivateActiveSubscription

};