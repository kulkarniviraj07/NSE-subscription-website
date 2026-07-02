import { createContext, useState, useEffect } from "react";
import { getToken, getUser, setToken, setUser, clearAuth } from "../utils/storage";
import { verifyToken as verifyTokenApi } from "../api/auth.api";
import { setupInterceptors } from "../api/interceptor";

export const AuthContext = createContext(null);

/**
 * MSG91 widget configuration.
 *
 * The widget is loaded once at app start. Individual pages call
 * window.initSendOTP() with `exposeMethods: true` to prevent the
 * default popup from appearing and instead drive the flow via
 * window.sendOtp / window.retryOtp / window.verifyOtp.
 */
const MSG91_WIDGET_SCRIPT = "https://verify.msg91.com/otp-provider.js";
const MSG91_WIDGET_ID     = import.meta.env.VITE_MSG91_WIDGET_ID;
const MSG91_TOKEN_AUTH    = import.meta.env.VITE_MSG91_TOKEN_AUTH;

export function AuthProvider({ children }) {
    const [user, setUserState] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    // ── Bootstrap ─────────────────────────────────────────────────────────
    useEffect(() => {
        // Register the 401 handler to reset React state on token expiry
        setupInterceptors(() => {
            setUserState(null);
            setIsAuthenticated(false);
        });

        const storedToken = getToken();
        const storedUser  = getUser();

        if (storedToken && storedUser) {
            setUserState(storedUser);
            setIsAuthenticated(true);
        }
        setLoading(false);

        // Load the MSG91 widget script once
        if (!document.querySelector(`script[src="${MSG91_WIDGET_SCRIPT}"]`)) {
            const script    = document.createElement("script");
            script.src      = MSG91_WIDGET_SCRIPT;
            script.async    = true;
            document.body.appendChild(script);
        }
    }, []);

    // ── Helpers ───────────────────────────────────────────────────────────

    /**
     * Wait until window.initSendOTP is available (async script load).
     * @param {number} [attempt=0]
     * @returns {Promise<void>}
     */
    function waitForWidget(attempt = 0) {
        return new Promise((resolve, reject) => {
            if (typeof window.initSendOTP === "function") {
                resolve();
            } else if (attempt < 20) {
                setTimeout(() => waitForWidget(attempt + 1).then(resolve).catch(reject), 300);
            } else {
                reject(new Error("MSG91 widget script failed to load. Please refresh and try again."));
            }
        });
    }

    /**
     * Initialise the MSG91 widget for a given mobile number.
     * Resolves with the MSG91 access-token on success,
     * or rejects with an error on failure.
     *
     * @param {string} mobile - 10-digit mobile number (country code will be prepended)
     * @returns {Promise<string>} MSG91 access-token
     */
    function initMsg91Widget(mobile) {
        return new Promise(async (resolve, reject) => {
            try {
                await waitForWidget();
            } catch (e) {
                return reject(e);
            }

            window.initSendOTP({
                widgetId:      MSG91_WIDGET_ID,
                tokenAuth:     MSG91_TOKEN_AUTH,
                identifier:    `91${mobile}`,   // MSG91 expects country code without +
                exposeMethods: true,             // prevents default popup; exposes window methods
                success: (data) => {
                    // data.message contains the verified access-token
                    resolve(data.message);
                },
                failure: (error) => {
                    reject(
                        new Error(
                            (typeof error === "string" ? error : error?.message) ||
                            "OTP verification failed"
                        )
                    );
                },
            });
        });
    }

    // ── Auth Actions ──────────────────────────────────────────────────────

    /**
     * Initialise the MSG91 widget and send OTP for login.
     * Returns a promise that resolves with the MSG91 access-token
     * when the user has successfully verified the OTP.
     *
     * After calling this, the page must call window.sendOtp() to trigger delivery.
     *
     * @param {string} mobile - 10-digit mobile number
     * @returns {Promise<string>} MSG91 access-token
     */
    async function login(mobile) {
        return await initMsg91Widget(mobile);
    }

    /**
     * Exchange a verified MSG91 access-token for an internal session JWT.
     * @param {string} mobile
     * @param {string} accessToken - from MSG91 widget success callback
     */
    async function verifyLogin(mobile, accessToken) {
        const data = await verifyTokenApi({ mobile, accessToken });
        if (data.token) {
            setToken(data.token);
            setUser(data.user);
            setUserState(data.user);
            setIsAuthenticated(true);
        }
        return data;
    }

    /**
     * Initialise the MSG91 widget and send OTP for registration.
     * @param {string} name   - user's full name (stored after OTP verification)
     * @param {string} mobile - 10-digit mobile number
     * @returns {Promise<string>} MSG91 access-token
     */
    async function register(name, mobile) {
        return await initMsg91Widget(mobile);
    }

    /**
     * Exchange a verified MSG91 access-token for an internal session JWT (registration path).
     * @param {string} name
     * @param {string} mobile
     * @param {string} accessToken - from MSG91 widget success callback
     */
    async function verifyRegister(name, mobile, accessToken) {
        const data = await verifyTokenApi({ name, mobile, accessToken });
        if (data.token) {
            setToken(data.token);
            setUser(data.user);
            setUserState(data.user);
            setIsAuthenticated(true);
        }
        return data;
    }

    /**
     * Log out user and clear local storage.
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
        MSG91_WIDGET_ID,
        MSG91_TOKEN_AUTH,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
export default AuthContext;