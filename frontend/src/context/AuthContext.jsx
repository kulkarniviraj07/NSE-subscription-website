import { createContext, useState, useEffect } from "react";
import { getToken, getUser, setToken, setUser, clearAuth } from "../utils/storage";
import { sendOtp as sendOtpApi, verifyOtp as verifyOtpApi } from "../api/auth.api";
import { setupInterceptors } from "../api/interceptor";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUserState] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    // Synchronize interceptors and restore session on mount
    useEffect(() => {
        // Register the 401 handler callback to reset React state on expiration
        setupInterceptors(() => {
            setUserState(null);
            setIsAuthenticated(false);
        });

        const storedToken = getToken();
        const storedUser = getUser();

        if (storedToken && storedUser) {
            setUserState(storedUser);
            setIsAuthenticated(true);
        }
        setLoading(false);
    }, []);

    /**
     * Dispatch OTP for login
     * @param {string} mobile 
     */
    async function login(mobile) {
        return await sendOtpApi({ mobile });
    }

    /**
     * Verify OTP and complete login
     * @param {string} mobile 
     * @param {string} otp 
     */
    async function verifyLogin(mobile, otp) {
        const data = await verifyOtpApi({ mobile, otp });
        if (data.token) {
            setToken(data.token);
            setUser(data.user);
            setUserState(data.user);
            setIsAuthenticated(true);
        }
        return data;
    }

    /**
     * Dispatch OTP for registration
     * @param {string} name 
     * @param {string} mobile 
     */
    async function register(name, mobile) {
        return await sendOtpApi({ mobile });
    }

    /**
     * Verify OTP and complete registration
     * @param {string} name 
     * @param {string} mobile 
     * @param {string} otp 
     */
    async function verifyRegister(name, mobile, otp) {
        const data = await verifyOtpApi({ name, mobile, otp });
        if (data.token) {
            setToken(data.token);
            setUser(data.user);
            setUserState(data.user);
            setIsAuthenticated(true);
        }
        return data;
    }

    /**
     * Log out user and clear storage
     */
    function logout() {
        clearAuth();
        setUserState(null);
        setIsAuthenticated(false);
    }

    const value = {
        user,
        isAuthenticated,
        loading,
        login,
        verifyLogin,
        register,
        verifyRegister,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
export default AuthContext;