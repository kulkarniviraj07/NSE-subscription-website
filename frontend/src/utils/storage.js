/**
 * Retrieve authorization token from local storage
 * @returns {string|null} JWT token
 */
export function getToken() {
    return localStorage.getItem("token");
}

/**
 * Persist authorization token in local storage
 * @param {string} token JWT token
 */
export function setToken(token) {
    localStorage.setItem("token", token);
}

/**
 * Remove token from local storage
 */
export function removeToken() {
    localStorage.removeItem("token");
}

/**
 * Retrieve user profile from local storage
 * @returns {Object|null} User data
 */
export function getUser() {
    const user = localStorage.getItem("user");
    try {
        return user ? JSON.parse(user) : null;
    } catch {
        return null;
    }
}

/**
 * Persist user data in local storage
 * @param {Object} user User data
 */
export function setUser(user) {
    localStorage.setItem("user", JSON.stringify(user));
}

/**
 * Remove user from local storage
 */
export function removeUser() {
    localStorage.removeItem("user");
}

/**
 * Flush authentication storage
 */
export function clearAuth() {
    removeToken();
    removeUser();
}
