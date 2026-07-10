import { createContext, useState, useEffect, useCallback } from "react";
import useAuth from "../hooks/useAuth";
import { getCompanies, getUserCompanies, addCompany as addCompanyApi, removeCompany as removeCompanyApi } from "../api/company.api";
import { getCurrentSubscription, activateFreePlan, activatePremiumPlan } from "../api/subscription.api";
import { getPlans } from "../api/plan.api";

export const AppContext = createContext(null);

export function AppProvider({ children }) {
    const { isAuthenticated } = useAuth();

    // Application state
    const [plans, setPlans] = useState([]);
    const [currentSubscription, setCurrentSubscription] = useState(null);
    const [allCompanies, setAllCompanies] = useState([]);
    const [selectedCompanies, setSelectedCompanies] = useState([]);
    const [announcements, setAnnouncements] = useState([]);
    const [activities, setActivities] = useState([
        {
            id: "act-1",
            title: "Security Token Synchronized",
            time: "10 minutes ago",
            desc: "Client authorization token re-issued and encrypted.",
            status: "success"
        },
        {
            id: "act-2",
            title: "Database Index Audited",
            time: "2 hours ago",
            desc: "NSE company announcement schemas synchronized.",
            status: "info"
        }
    ]);

    // Loading & error trackers
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    /**
     * Compile dynamic filings / announcements immediately as user selections update.
     */
    const compileAnnouncements = useCallback((tracked) => {
        if (!tracked || tracked.length === 0) {
            setAnnouncements([]);
            return;
        }

        const templates = [
            {
                title: "Financial Results for the Quarter ended March 31, 2026",
                desc: "Board of Directors approved Audited Standalone & Consolidated Financial statements. Revenue grew 12.4% YoY.",
                offsetHours: 1,
                category: "Financials"
            },
            {
                title: "Outcome of Board Meeting for Dividend recommendation",
                desc: "Board has recommended a final Dividend of Rs. 18.50 per Equity share for the financial year ended March 31, 2026.",
                offsetHours: 3,
                category: "Corporate Action"
            },
            {
                title: "Intimation of closure of Trading Window",
                desc: "Pursuant to SEBI Prohibition of Insider Trading regulations, trading window for dealing in securities stands closed.",
                offsetHours: 8,
                category: "Regulatory"
            },
            {
                title: "Press Release - Strategic collaboration in Cloud AI",
                desc: "Announced signing of agreement with global hyper-scalers to deliver advanced predictive analytics services.",
                offsetHours: 24,
                category: "Business Updates"
            }
        ];

        let compiled = [];
        tracked.forEach((company, cIndex) => {
            // Give each company a unique set of announcements
            templates.forEach((temp, tIndex) => {
                const hours = temp.offsetHours + (cIndex * 2);
                const timeString = hours < 24 ? `${hours} hours ago` : "Yesterday";
                
                compiled.push({
                    id: `ann-${company.id || company.company_id}-${tIndex}`,
                    companyName: company.name,
                    companyCode: company.code,
                    title: temp.title,
                    desc: temp.desc,
                    category: temp.category,
                    timestamp: timeString,
                    hoursAgo: hours
                });
            });
        });

        // Sort announcement list by recency (least hours first)
        compiled.sort((a, b) => a.hoursAgo - b.hoursAgo);
        setAnnouncements(compiled);
    }, []);

    /**
     * Hydrate all application data
     */
    const loadAppData = useCallback(async () => {
        if (!isAuthenticated) return;

        try {
            setLoading(true);
            setError("");

            // 1. Fetch available plan levels
            const plansData = await getPlans();
            setPlans(plansData.plans || []);

            // 2. Fetch user's current subscription
            const subData = await getCurrentSubscription();
            setCurrentSubscription(subData.subscription || null);

            // 3. Fetch all companies
            const compsData = await getCompanies();
            setAllCompanies(compsData.companies || []);

            // 4. Fetch user's selected companies
            const userCompsData = await getUserCompanies();
            const tracked = userCompsData.companies || [];
            setSelectedCompanies(tracked);
            compileAnnouncements(tracked);

        } catch (err) {
            console.error("APP DATA RECOVERY FAILURE:", err);
            setError("Failed to load application data. Please verify your connection.");
        } finally {
            setLoading(false);
        }
    }, [isAuthenticated, compileAnnouncements]);

    // Initial load on mount/auth change
    useEffect(() => {
        loadAppData();
    }, [loadAppData]);

    /**
     * Direct Free Plan activation controller
     */
    const handleActivateFree = async () => {
        try {
            setLoading(true);
            const data = await activateFreePlan();
            setCurrentSubscription(data.subscription);
            
            // Record activity log
            setActivities(prev => [
                {
                    id: `act-${Date.now()}`,
                    title: "Activated FREE Plan",
                    time: "Just now",
                    desc: "Free plan successfully registered with a limit of 10 companies.",
                    status: "success"
                },
                ...prev
            ]);
            
            await loadAppData();
        } catch (err) {
            console.error("FREE PLAN ERROR:", err);
            throw new Error(err?.response?.data?.message || "Failed to activate Free subscription.");
        } finally {
            setLoading(false);
        }
    };

    /**
     * Add tracked company checking limits
     * @param {Object} company 
     */
    const addTrackedCompany = async (company) => {
        if (!currentSubscription) {
            throw new Error("No active plan. Please select a plan to begin tracking.");
        }

        const currentLimit = currentSubscription.company_limit;
        if (selectedCompanies.length >= currentLimit) {
            throw new Error(`Maximum limit of ${currentLimit} companies breached. Please upgrade your plan.`);
        }

        try {
            const compId = company.id || company.company_id;
            await addCompanyApi(compId);
            
            // Log details
            setActivities(prev => [
                {
                    id: `act-${Date.now()}`,
                    title: `Added ${company.code}`,
                    time: "Just now",
                    desc: `Added ${company.name} to watch notifications list.`,
                    status: "success"
                },
                ...prev
            ]);

            // Refresh selections
            const userCompsData = await getUserCompanies();
            const tracked = userCompsData.companies || [];
            setSelectedCompanies(tracked);
            compileAnnouncements(tracked);
        } catch (err) {
            console.error("ADD WATCH ERROR:", err);
            throw new Error(err?.response?.data?.message || `Failed to track ${company.code}.`);
        }
    };

    /**
     * Remove tracked company
     * @param {Object} company 
     */
    const removeTrackedCompany = async (company) => {
        try {
            const compId = company.id || company.company_id;
            await removeCompanyApi(compId);

            // Log details
            setActivities(prev => [
                {
                    id: `act-${Date.now()}`,
                    title: `Removed ${company.code}`,
                    time: "Just now",
                    desc: `Removed ${company.name} from monitoring list.`,
                    status: "info"
                },
                ...prev
            ]);

            // Refresh selections
            const userCompsData = await getUserCompanies();
            const tracked = userCompsData.companies || [];
            setSelectedCompanies(tracked);
            compileAnnouncements(tracked);
        } catch (err) {
            console.error("REMOVE WATCH ERROR:", err);
            throw new Error(err?.response?.data?.message || `Failed to untrack ${company.code}.`);
        }
    };

    /**
     * Activate PREMIUM via a 100%-off coupon (validated server-side).
     * Deactivates any current plan, grants a real ACTIVE premium subscription,
     * then re-hydrates app state.
     */
    const handleActivatePremium = async (coupon) => {
        try {
            setLoading(true);
            const data = await activatePremiumPlan(coupon);
            if (data?.subscription) {
                setCurrentSubscription(data.subscription);
            }

            const premiumPlan = plans.find(p => p.name === "PREMIUM");
            const limit = premiumPlan?.company_limit || data?.subscription?.company_limit || 25;

            setActivities(prev => [
                {
                    id: `act-${Date.now()}`,
                    title: "Upgraded to PREMIUM",
                    time: "Just now",
                    desc: `Premium activated. Watchlist limit expanded to ${limit} companies.`,
                    status: "success"
                },
                ...prev
            ]);

            await loadAppData();
        } catch (err) {
            console.error("PREMIUM PLAN ERROR:", err);
            throw new Error(err?.response?.data?.message || "Failed to activate Premium subscription.");
        } finally {
            setLoading(false);
        }
    };

    const value = {
        plans,
        currentSubscription,
        allCompanies,
        selectedCompanies,
        announcements,
        activities,
        loading,
        error,
        loadAppData,
        handleActivateFree,
        handleActivatePremium,
        addTrackedCompany,
        removeTrackedCompany,
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
}

export default AppContext;
