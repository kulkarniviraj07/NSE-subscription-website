import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

/**
 * Custom hook to retrieve authentication context values.
 * @returns {Object} Auth values and handlers (user, isAuthenticated, login, verifyLogin, register, verifyRegister, logout)
 */
export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be consumed within an AuthProvider");
    }
    return context;
}

export default useAuth;