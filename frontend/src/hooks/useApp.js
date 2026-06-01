import { useContext } from "react";
import { AppContext } from "../context/AppContext";

/**
 * Custom hook to retrieve global application context states and action triggers.
 * @returns {Object} Global app details (plans, currentSubscription, selectedCompanies, announcements, etc.)
 */
export function useApp() {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useApp must be consumed within an AppProvider");
    }
    return context;
}

export default useApp;
