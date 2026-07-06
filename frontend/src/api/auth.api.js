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

/**
 * TEMPORARY — Razorpay test-mode login (username/password).
 * Calls the temporary backend endpoint used only for Razorpay's
 * integration testing. Remove alongside authApi.loginWithTestCredentials
 * in AuthContext, the Login page's test-login UI, and the backend route
 * once testing is complete.
 *
 * @param {Object} payload
 * @param {string} payload.username
 * @param {string} payload.password
 * @returns {Promise<Object>} Contains { token, user, isNewUser } on success
 */
export async function loginWithTestCredentials(payload) {
    const response = await API.post("/auth/login-test", payload);
    return response.data;
}
