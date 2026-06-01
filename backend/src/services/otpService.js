const bcrypt =
    require("bcryptjs");

const otpRepository =
    require(
        "../repositories/otpRepository"
    );

const generateOtp =
    require(
        "../utils/otpGenerator"
    );

async function createOtp(
    mobile
) {

    const otp =
        generateOtp();

    const otpHash =
        await bcrypt.hash(
            otp,
            10
        );

    const expiresAt =
        new Date(
            Date.now() +
            5 * 60 * 1000
        );

    await otpRepository.create(

        mobile,

        otpHash,

        expiresAt

    );

    return otp;

}

async function verifyOtp(
    mobile,
    otp
) {

    const record =

        await otpRepository
            .findLatestByMobile(
                mobile
            );

    if (
        !record
    ) {

        return false;

    }

    if (
        record.verified
    ) {

        return false;

    }

    if (
        new Date() >
        new Date(
            record.expires_at
        )
    ) {

        return false;

    }

    const matched =

        await bcrypt.compare(

            otp,

            record.otp_hash

        );

    if (
        !matched
    ) {

        return false;

    }

    await otpRepository
        .markVerified(
            record.id
        );

    return true;

}

module.exports = {

    createOtp,

    verifyOtp

};