const db =
    require(
        "../config/database"
    );

async function create(
    userId,
    amount,
    orderId
) {

    const result =

        await db.query(

            `
            INSERT INTO payments (

                user_id,
                amount,
                razorpay_order_id,
                status

            )

            VALUES (

                $1,
                $2,
                $3,
                'PENDING'

            )

            RETURNING *
            `,

            [

                userId,
                amount,
                orderId

            ]

        );

    return result.rows[0];

}

async function markPaid(
    orderId,
    paymentId
) {

    await db.query(

        `
        UPDATE payments

        SET

            status = 'SUCCESS',

            razorpay_payment_id = $1

        WHERE

            razorpay_order_id = $2
        `,

        [

            paymentId,
            orderId

        ]

    );

}

async function findByOrderId(
    orderId
) {

    const result =

        await db.query(

            `
            SELECT *

            FROM payments

            WHERE razorpay_order_id = $1
            `,

            [orderId]

        );

    return result.rows[0];

}

module.exports = {

    create,

    markPaid,

    findByOrderId

};