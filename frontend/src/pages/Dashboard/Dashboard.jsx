import React from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useApp from "../../hooks/useApp";

/**
 * Main Control Center Dashboard.
 * Restructured visual layout displaying Welcome Card with dynamic plan metrics,
 * Selected Companies watchlist catalog, and active Subscription Tier card.
 */
export function Dashboard() {
    const { user } = useAuth();
    const {
        selectedCompanies,
        currentSubscription
    } = useApp();

    const navigate = useNavigate();

    // Data metrics
    const selectedCount = selectedCompanies.length;
    const limit = currentSubscription ? (currentSubscription.company_limit || currentSubscription.limit || 5) : 5;
    
    // Exact subscription plan field mapping used by PlanSelection page
    const currentPlanName =
        currentSubscription?.plan_name ||
        currentSubscription?.name ||
        "FREE";

    const isPremium = currentPlanName === "PREMIUM";

    return (
        <div className="space-y-6 pb-8 font-sans bg-transparent text-[#9298A0]">
            {/* SECTION 1: Welcome Card (Shows Name, Mobile Number, Current Plan) */}
            <div className="bg-gradient-to-r from-[#0C0E14] to-[#151921] rounded-2xl p-6 md:p-8 border border-[#222A38] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 text-left">
                <div className="space-y-1.5">
                    <h2 className="text-2xl sm:text-3xl font-bold text-[#E3E5EA] tracking-tight">
                        Welcome, {user?.name || "User"}
                    </h2>
                    <p className="text-[#6B7280] text-xs sm:text-sm">
                        Manage your stock watchlist and subscription plan details.
                    </p>
                </div>
                
                <div className="flex flex-wrap gap-6 text-sm text-[#9298A0] font-semibold border-t md:border-t-0 md:border-l border-[#222A38] pt-4 md:pt-0 md:pl-8">
                    <div className="space-y-0.5">
                        <span className="block text-[10px] text-[#6B7280] font-bold uppercase tracking-wider">Mobile Number</span>
                        <span className="text-sm text-[#E3E5EA] font-bold block">
                            +91 {user?.mobile || "N/A"}
                        </span>
                    </div>
                    <div className="space-y-0.5">
                        <span className="block text-[10px] text-[#6B7280] font-bold uppercase tracking-wider">Current Plan</span>
                        <span className="text-sm text-[#33D097] font-bold uppercase block">
                            {currentPlanName}
                        </span>
                    </div>
                    <div className="space-y-0.5">
                        <span className="block text-[10px] text-[#6B7280] font-bold uppercase tracking-wider">Companies Selected</span>
                        <span className="text-sm text-[#E3E5EA] font-bold block">
                            {selectedCount} <span className="text-[#222A38]">/</span> {limit}
                        </span>
                    </div>
                </div>
            </div>

            {/* Layout Grid for Sections 2 & 3 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* SECTION 2: Selected Companies */}
                <div className="bg-[#151921] rounded-2xl p-6 border border-[#222A38] shadow-md shadow-[#0C0E14]/40 flex flex-col justify-between text-left min-h-[300px]">
                    <div>
                        <h3 className="text-lg font-bold text-[#E3E5EA] mb-4">
                            Selected Companies
                        </h3>
                        
                        {selectedCount === 0 ? (
                            <p className="text-[#9298A0] text-sm leading-relaxed py-4">
                                You are not tracking any companies yet. Click manage below to add stocks to your watchlist.
                            </p>
                        ) : (
                            <div className="space-y-3 max-h-[220px] overflow-y-auto custom-scrollbar pr-1">
                                {selectedCompanies.map((c) => (
                                    <div
                                        key={c.id || c.company_id}
                                        className="flex items-center justify-between p-3.5 rounded-xl bg-[#0C0E14] border border-[#222A38] hover:bg-[#151921] hover:border-[#33D097]/40 transition duration-150"
                                    >
                                        <div className="flex items-center gap-3 truncate">
                                            <div className="w-8 h-8 rounded-lg bg-[#151921] border border-[#222A38] text-[#33D097] font-bold text-xs flex items-center justify-center shrink-0">
                                                {(c.symbol || c.code || "CMP").slice(0, 3)}
                                            </div>
                                            <div className="truncate">
                                                <span className="block text-xs font-bold text-[#E3E5EA]">
                                                    {c.symbol || c.code || "UNKNOWN"}
                                                </span>
                                                <span className="block text-[10px] text-[#6B7280] font-medium truncate">
                                                    {c.company_name || c.name || "Company"}
                                                </span>
                                            </div>
                                        </div>
                                        <span className="text-[9px] font-bold text-[#33D097] bg-[#151921] border border-[#222A38] px-2 py-0.5 rounded-full shrink-0">
                                            TRACKING
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    
                    <button
                        onClick={() => navigate("/companies")}
                        className="w-full mt-6 bg-[#33D097] hover:bg-[#3BE6A7] text-[#0C0E14] rounded-xl py-3 px-4 font-semibold text-sm transition duration-150 text-center shadow-sm block focus:outline-none focus:ring-2 focus:ring-[#33D097]/20 active:scale-[0.98]"
                    >
                        Manage Companies
                    </button>
                </div>

                {/* SECTION 3: Subscription */}
                <div className="bg-[#151921] rounded-2xl p-6 border border-[#222A38] shadow-md shadow-[#0C0E14]/40 flex flex-col justify-between text-left min-h-[300px]">
                    <div>
                        <h3 className="text-lg font-bold text-[#E3E5EA] mb-4">
                            Subscription
                        </h3>
                        
                        <div className="py-2.5">
                            <span className="text-[#6B7280] text-xs font-bold uppercase tracking-wider">Plan Tier</span>
                            <div className="mt-1 flex items-baseline gap-2">
                                <span className="text-4xl font-bold text-[#E3E5EA] tracking-tight">
                                    {currentPlanName}
                                </span>
                                <span className="text-[10px] font-bold px-2 py-0.5 rounded uppercase bg-[#151921] text-[#33D097] border border-[#222A38]">
                                    ACTIVE
                                </span>
                            </div>
                            <p className="text-[#9298A0] text-xs mt-4 leading-relaxed">
                                {isPremium
                                    ? "Premium subscription active. You have full access to the Nifty 500 catalog watchlist with accelerated alert channels."
                                    : "Free subscription active. Monitor up to 5 listed companies with standard updates."}
                            </p>
                        </div>
                    </div>
                    
                    <button
                        onClick={() => navigate("/plans")}
                        className="w-full mt-6 bg-[#33D097] hover:bg-[#3BE6A7] text-[#0C0E14] rounded-xl py-3 px-4 font-semibold text-sm transition duration-150 text-center shadow-sm block focus:outline-none focus:ring-2 focus:ring-[#33D097]/20 active:scale-[0.98]"
                    >
                        Upgrade Plan
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
