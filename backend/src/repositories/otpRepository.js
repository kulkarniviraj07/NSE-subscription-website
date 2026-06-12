const db =
    require("../config/database");

async function create(
    mobile,
    otpHash,
    expiresAt
) {

    const result =
        await db.query(

            `
            INSERT INTO otp_verifications (

                mobile,
                otp_hash,
                expires_at

            )

            VALUES (

                $1,
                $2,
                $3

            )

            RETURNING id, mobile, expires_at
            `,

            [
                mobile,
                otpHash,
                expiresAt
            ]

        );

    return result.rows[0];

}

async function findLatestByMobile(
    mobile
) {

    const result =
        await db.query(

            `
            SELECT

                id,
                mobile,
                otp_hash,
                expires_at,
                verified,
                attempts

            FROM otp_verifications

            WHERE mobile = $1

            ORDER BY created_at DESC

            LIMIT 1
            `,

            [mobile]

        );

    return result.rows[0];

}

async function markVerified(
    id
) {

    await db.query(

        `
        UPDATE otp_verifications

        SET verified = TRUE

        WHERE id = $1
        `,

        [id]

    );

}

async function incrementAttempts(
    id
) {

    await db.query(

        `
        UPDATE otp_verifications

        SET attempts = attempts + 1

        WHERE id = $1
        `,

        [id]

    );

}

module.exports = {

    create,

    findLatestByMobile,

    markVerified,

    incrementAttempts

};
