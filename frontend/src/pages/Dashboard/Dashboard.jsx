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
            <div className="bg-gradient-to-r from-[#0C0E14] to-[#151921] rounded-2xl p-6 md:p-8 border border-[#222A38] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 text-left relative overflow-hidden">
                <div className="absolute inset-0 bg-market-grid opacity-10 pointer-events-none" />
                <div className="space-y-1.5 relative z-10">
                    <h2 className="text-2xl sm:text-3xl font-bold text-[#E3E5EA] tracking-tight">
                        Welcome, {user?.name || "User"}
                    </h2>
                    <p className="text-[#6B7280] text-xs sm:text-sm">
                        Manage your stock watchlist and subscription plan details.
                    </p>
                </div>
                
                <div className="flex flex-wrap gap-6 text-sm text-[#9298A0] font-semibold border-t md:border-t-0 md:border-l border-[#222A38] pt-4 md:pt-0 md:pl-8 relative z-10 font-mono">
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

            {/* SECTION 1.5: Market Index Widget Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono text-xs text-[#9298A0] text-left">
                <div className="p-4 bg-[#151921] border border-[#222A38] rounded-2xl shadow-sm">
                    <span className="block text-[10px] text-[#6B7280] font-bold uppercase tracking-wider">NIFTY 50</span>
                    <div className="flex items-baseline gap-2 mt-1">
                        <span className="text-xs font-bold text-brand-cyan">Live Tracking Enabled</span>
                    </div>
                    {/* Mock sparkline */}
                    <svg className="w-full h-8 mt-2 text-[#33D097]" stroke="currentColor" fill="none" strokeWidth="1.5">
                        <path d="M 0 20 Q 20 10 40 18 T 80 5 T 120 12 T 160 8" />
                    </svg>
                </div>
                <div className="p-4 bg-[#151921] border border-[#222A38] rounded-2xl shadow-sm">
                    <span className="block text-[10px] text-[#6B7280] font-bold uppercase tracking-wider">BSE SENSEX</span>
                    <div className="flex items-baseline gap-2 mt-1">
                        <span className="text-xs font-bold text-brand-cyan">Real-Time Monitoring</span>
                    </div>
                    <svg className="w-full h-8 mt-2 text-[#33D097]" stroke="currentColor" fill="none" strokeWidth="1.5">
                        <path d="M 0 18 Q 20 5 40 15 T 80 10 T 120 5" />
                    </svg>
                </div>
                <div className="p-4 bg-[#151921] border border-[#222A38] rounded-2xl shadow-sm">
                    <span className="block text-[10px] text-[#6B7280] font-bold uppercase tracking-wider">BANK NIFTY</span>
                    <div className="flex items-baseline gap-2 mt-1">
                        <span className="text-xs font-bold text-brand-cyan">NSE/BSE Monitoring Active</span>
                    </div>
                    <svg className="w-full h-8 mt-2 text-[#33D097]" stroke="currentColor" fill="none" strokeWidth="1.5">
                        <path d="M 0 22 Q 20 15 40 25 T 80 10 T 120 15" />
                    </svg>
                </div>
                <div className="p-4 bg-[#151921] border border-[#222A38] rounded-2xl shadow-sm col-span-2 md:col-span-1">
                    <span className="block text-[10px] text-[#6B7280] font-bold uppercase tracking-wider">INDIA VIX</span>
                    <div className="flex items-baseline gap-2 mt-1">
                        <span className="text-xs font-bold text-brand-cyan">Announcement Tracking Active</span>
                    </div>
                    <svg className="w-full h-8 mt-2 text-[#33D097]" stroke="currentColor" fill="none" strokeWidth="1.5">
                        <path d="M 0 10 Q 20 20 40 15 T 80 22 T 120 10" />
                    </svg>
                </div>
            </div>

            {/* Layout Grid for Sections 2 & 3 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* SECTION 2: Selected Companies Watchlist */}
                <div className="bg-[#151921] rounded-2xl p-6 border border-[#222A38] shadow-md shadow-[#0C0E14]/40 flex flex-col justify-between text-left min-h-[300px]">
                    <div>
                        <div className="flex items-center justify-between mb-4 border-b border-[#222A38] pb-3">
                            <h3 className="text-lg font-bold text-[#E3E5EA]">
                                Watchlist Builder
                            </h3>
                            <span className="text-[10px] font-mono font-bold text-brand-cyan bg-brand-cyan/10 px-2 py-0.5 border border-brand-cyan/20 rounded">
                                ACTIVE INDEX
                            </span>
                        </div>
                        
                        {selectedCount === 0 ? (
                            <p className="text-[#9298A0] text-sm leading-relaxed py-4">
                                You are not tracking any companies yet. Click manage below to add stocks to your watchlist.
                            </p>
                        ) : (
                            <div className="space-y-3 max-h-[220px] overflow-y-auto custom-scrollbar pr-1">
                                {selectedCompanies.map((c) => (
                                    <div
                                        key={c.id || c.company_id}
                                        className="flex items-center justify-between p-3.5 rounded-xl bg-[#0C0E14] border border-[#222A38] hover:bg-[#151921] hover:border-[#33D097]/40 transition duration-150 font-mono"
                                    >
                                        <div className="flex items-center gap-3 truncate">
                                            <div className="w-12 h-8 rounded-lg bg-[#151921] border border-[#222A38] text-[#33D097] font-bold text-xs flex items-center justify-center shrink-0">
                                                {(c.symbol || c.code || "CMP").slice(0, 5)}
                                            </div>
                                            <div className="truncate text-left">
                                                <span className="block text-xs font-bold text-[#E3E5EA] truncate">
                                                    {c.company_name || c.name || "Company"}
                                                </span>
                                                <span className="block text-[9px] text-[#6B7280] font-bold">
                                                    NSE / BSE
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4 shrink-0 text-right">
                                            <span className="text-[10px] font-bold px-2 py-0.5 rounded uppercase bg-[#151921] text-[#33D097] border border-[#222A38]">
                                                Tracking Active
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    
                    <button
                        onClick={() => navigate("/companies")}
                        className="w-full mt-6 bg-[#33D097] hover:bg-[#3BE6A7] text-[#0C0E14] rounded-xl py-3 px-4 font-semibold text-sm transition duration-150 text-center shadow-sm block focus:outline-none focus:ring-2 focus:ring-[#33D097]/20 active:scale-[0.98]"
                    >
                        Configure Watchlist Tickers
                    </button>
                </div>

                {/* SECTION 3: Subscription License */}
                <div className="bg-[#151921] rounded-2xl p-6 border border-[#222A38] shadow-md shadow-[#0C0E14]/40 flex flex-col justify-between text-left min-h-[300px]">
                    <div>
                        <div className="flex items-center justify-between mb-4 border-b border-[#222A38] pb-3">
                            <h3 className="text-lg font-bold text-[#E3E5EA]">
                                Terminal License
                            </h3>
                            <span className="text-[10px] font-mono font-bold text-brand-cyan bg-brand-cyan/10 px-2 py-0.5 border border-brand-cyan/20 rounded">
                                VERIFIED
                            </span>
                        </div>
                        
                        <div className="py-2.5">
                            <span className="text-[#6B7280] text-xs font-bold uppercase tracking-wider">License Clearance Tier</span>
                            <div className="mt-1 flex items-baseline gap-2">
                                <span className="text-4xl font-bold text-[#E3E5EA] tracking-tight font-mono">
                                    {currentPlanName}
                                </span>
                                <span className="text-[10px] font-bold px-2 py-0.5 rounded uppercase bg-[#151921] text-[#33D097] border border-[#222A38]">
                                    ACTIVE
                                </span>
                            </div>
                            <p className="text-[#9298A0] text-xs mt-4 leading-relaxed">
                                {isPremium
                                    ? "Professional Watchlist license active. Full terminal monitoring access to the Nifty 500 catalog list with instant priority dispatch alerts."
                                    : "Starter Watchlist license active. Monitored alerts covering up to 5 NSE/BSE stocks with standard dispatch speeds."}
                            </p>
                        </div>
                    </div>
                    
                    <button
                        onClick={() => navigate("/plans")}
                        className="w-full mt-6 bg-[#33D097] hover:bg-[#3BE6A7] text-[#0C0E14] rounded-xl py-3 px-4 font-semibold text-sm transition duration-150 text-center shadow-sm block focus:outline-none focus:ring-2 focus:ring-[#33D097]/20 active:scale-[0.98]"
                    >
                        Modify Clearance Plan
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
