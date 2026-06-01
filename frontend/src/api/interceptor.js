import API from "./axios";

export function setupInterceptors(onUnauthorized) {
    // Request Interceptor: Attach JWT Token
    API.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem("token");
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    // Response Interceptor: Capture Unauthorized Responses
    API.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            if (error.response && error.response.status === 401) {
                // Clear local authentication storage
                localStorage.removeItem("token");
                localStorage.removeItem("user");

                // Execute callback if provided (e.g. state reset in AuthContext)
                if (onUnauthorized) {
                    onUnauthorized();
                } else {
                    // Fallback redirect
                    window.location.href = "/login";
                }
            }
            return Promise.reject(error);
        }
    );
}
