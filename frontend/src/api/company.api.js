import API from "./axios";

/**
 * Fetch all companies available (Nifty 500).
 * @returns {Promise<Object>} List of companies
 */
export async function getCompanies() {
    const response = await API.get("/companies");
    return response.data;
}

/**
 * Search companies by query string.
 * @param {string} q 
 * @returns {Promise<Object>} Filtered list of companies
 */
export async function searchCompanies(q) {
    const response = await API.get(`/companies/search?q=${encodeURIComponent(q)}`);
    return response.data;
}

/**
 * Get companies currently selected/tracked by the user.
 * @returns {Promise<Object>} User's selected companies
 */
export async function getUserCompanies() {
    const response = await API.get("/user/companies");
    return response.data;
}

/**
 * Add a company to the user's tracking list.
 * @param {number|string} companyId 
 * @returns {Promise<Object>} Success response
 */
export async function addCompany(companyId) {
    const response = await API.post("/user/companies", { companyId });
    return response.data;
}

/**
 * Remove a company from the user's tracking list.
 * @param {number|string} companyId 
 * @returns {Promise<Object>} Success response
 */
export async function removeCompany(companyId) {
    // Delete payload must be in the `data` config block for axios.delete
    const response = await API.delete("/user/companies", { data: { companyId } });
    return response.data;
}
