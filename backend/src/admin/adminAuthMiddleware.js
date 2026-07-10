const crypto = require("crypto");

/**
 * Authenticates requests coming from the Pureframe Central Dashboard.
 * The dashboard calls this backend server-to-server (never from a
 * user's browser), presenting a shared secret in the `x-central-api-key`
 * header. This is separate from the normal user JWT auth used by the
 * consumer app, and is only mounted under /api/admin/v1.
 */
function adminAuthMiddleware(req, res, next) {
    const provided = req.headers["x-central-api-key"];
    const expected = process.env.CENTRAL_API_KEY;

    if (!expected) {
        console.error(
            "CENTRAL_API_KEY is not set — refusing all admin API requests."
        );
        return res.status(500).json({
            success: false,
            message: "Admin API is not configured on this server",
        });
    }

    if (!provided || typeof provided !== "string") {
        return res.status(401).json({
            success: false,
            message: "Missing x-central-api-key header",
        });
    }

    const providedBuf = Buffer.from(provided);
    const expectedBuf = Buffer.from(expected);

    const isValid =
        providedBuf.length === expectedBuf.length &&
        crypto.timingSafeEqual(providedBuf, expectedBuf);

    if (!isValid) {
        return res.status(401).json({
            success: false,
            message: "Invalid API key",
        });
    }

    next();
}

module.exports = adminAuthMiddleware;
