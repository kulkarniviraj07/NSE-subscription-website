import API from "./axios";

/**
 * Fetch the user's current active subscription state.
 * @returns {Promise<Object>} Current active subscription
 */
export async function getCurrentSubscription() {
    const response = await API.get("/subscriptions/current");
    return response.data;
}

/**
 * Activate the standard FREE plan tier.
 * @returns {Promise<Object>} Verification details
 */
export async function activateFreePlan() {
    const response = await API.post("/subscriptions/free");
    return response.data;
}

/**
 * Activate the PREMIUM plan directly (TESTING MODE — no payment).
 * @returns {Promise<Object>} The newly activated subscription
 */
export async function activatePremiumPlan() {
    const response = await API.post("/subscriptions/premium");
    return response.data;
}
