const jwtUtil =
    require(
        "../utils/jwt"
    );

async function authMiddleware(
    req,
    res,
    next
) {

    try {

        const authHeader =

            req.headers.authorization;

        if (
            !authHeader ||
            !authHeader.startsWith("Bearer ")
        ) {

            return res
                .status(401)
                .json({

                    success: false,

                    message:
                        "Authorization token required"

                });

        }

        const token =

            authHeader.slice(
                "Bearer ".length
            );

        const decoded =

            jwtUtil.verifyToken(
                token
            );

        req.user =
            decoded;

        next();

    }
    catch (err) {

        return res
            .status(401)
            .json({

                success: false,

                message:
                    "Invalid token"

            });

    }

}

module.exports =
    authMiddleware;