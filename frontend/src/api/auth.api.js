import API from "./axios";

/**
 * Verifies the MSG91 widget access-token on the server side.
 * Called after window.verifyOtp() succeeds in the frontend widget flow,
 * passing the JWT access-token returned by the MSG91 widget.
 *
 * @param {Object} payload
 * @param {string} payload.accessToken - JWT access-token from MSG91 widget success callback
 * @param {string} payload.mobile      - 10-digit mobile number (without +91)
 * @param {string} [payload.name]      - Full name (required only for new registration)
 * @returns {Promise<Object>} Contains { token, user } on success
 */
export async function verifyToken(payload) {
    const response = await API.post("/auth/verify-token", payload);
    return response.data;
}
