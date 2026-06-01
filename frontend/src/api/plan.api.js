import API from "./axios";

/**
 * Fetch all billing plans seeded in the database.
 * @returns {Promise<Object>} Available plan tiers
 */
export async function getPlans() {
    const response = await API.get("/plans");
    return response.data;
}
