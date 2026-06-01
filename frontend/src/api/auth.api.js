import API from "./axios";

/**
 * Dispatches an SMS One-Time Password to the user's mobile number.
 * @param {Object} payload
 * @param {string} payload.mobile
 * @returns {Promise<Object>} Response object
 */
export async function sendOtp(payload) {
    const response = await API.post("/auth/send-otp", payload);
    return response.data;
}

/**
 * Verifies the OTP and registers or logs in the user.
 * @param {Object} payload
 * @param {string} [payload.name] Required only for registration
 * @param {string} payload.mobile
 * @param {string} payload.otp
 * @returns {Promise<Object>} Contains token and user details
 */
export async function verifyOtp(payload) {
    const response = await API.post("/auth/verify-otp", payload);
    return response.data;
}
