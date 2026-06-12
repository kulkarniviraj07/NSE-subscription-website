const jwt =
    require(
        "jsonwebtoken"
    );

function generateToken(
    user
) {

    return jwt.sign(

        {

            id: user.id,

            mobile: user.mobile

        },

        process.env.JWT_SECRET,

        {

            expiresIn: "7d"

        }

    );

}

function verifyToken(
    token
) {

    return jwt.verify(

        token,

        process.env.JWT_SECRET

    );

}

module.exports = {

    generateToken,

    verifyToken

};