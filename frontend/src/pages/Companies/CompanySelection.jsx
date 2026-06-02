import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import useApp from "../../hooks/useApp";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import EmptyState from "../../components/common/EmptyState";
import { ListSkeleton } from "../../components/ui/Skeleton";

/**
 * Clean SaaS Company Selection Module.
 * Restructured to remove all started/stopped tracking success banners and icons,
 * while keeping error notifications and catalog limits intact.
 */
export function CompanySelection() {
    const {
        allCompanies,
        selectedCompanies,
        currentSubscription,
        addTrackedCompany,
        removeTrackedCompany,
        loading
    } = useApp();

    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const [actionLoading, setActionLoading] = useState(null); // Tracks company ID being modified
    const [errorMessage, setErrorMessage] = useState("");

    // Calculate limits
    const limit = currentSubscription ? currentSubscription.company_limit : 5;
    const selectedCount = selectedCompanies.length;

    // Filter available catalog companies based on search query
    const filteredCompanies = useMemo(() => {
        const query = searchQuery.trim().toLowerCase();
        if (!query) return allCompanies.slice(0, 80); // Default window to avoid DOM fatigue
        return allCompanies.filter(
            (c) =>
                (c.company_name || "")
                    .toLowerCase()
                    .includes(query) ||

                (c.symbol || "")
                    .toLowerCase()
                    .includes(query)
        );
    }, [allCompanies, searchQuery]);

    // Check if a company ID is tracked
    const isTracked = (id) => {
        return selectedCompanies.some((c) => (c.id || c.company_id) === id);
    };

    /**
     * Toggles stock tracking state (calls APIs immediately under the hood)
     */
    const handleToggleCompany = async (company) => {
        const compId = company.id || company.company_id;
        if (actionLoading !== null) return; // Block double-clicks

        setErrorMessage("");
        setActionLoading(compId);

        const tracked = isTracked(compId);
        try {
            if (tracked) {
                await removeTrackedCompany(company);
            } else {
                if (selectedCount >= limit) {
                    setErrorMessage(`Limit reached. Maximum limit is ${limit} companies for your active plan.`);
                    setTimeout(() => setErrorMessage(""), 4000);
                    return;
                }
                await addTrackedCompany(company);
            }
        } catch (err) {
            setErrorMessage(err.message || "Failed to update tracking state.");
            setTimeout(() => setErrorMessage(""), 5000);
        } finally {
            setActionLoading(null);
        }
    };

    return (
        <div className="space-y-6 pb-28 font-sans bg-transparent text-brand-slate relative">
            {/* Header info */}
            <div className="text-left space-y-1 mt-4">
                <h2 className="text-2xl font-bold text-[#E3E5EA] tracking-tight">
                    Watchlist Builder
                </h2>
                <p className="text-brand-slate text-sm leading-relaxed">
                    Select the equities you want to monitor in real-time.
                </p>
            </div>

            {/* Error Notifications only (Success messages completely removed) */}
            {errorMessage && (
                <div className="p-4 bg-[#151921] border border-red-900/50 text-red-400 rounded-2xl text-xs font-semibold flex items-center gap-2.5 shadow-sm max-w-xl text-left">
                    <svg className="w-4.5 h-4.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <span>{errorMessage}</span>
                </div>
            )}

            {/* Search Bar */}
            <div className="space-y-1 text-left">
                <Input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search equity symbol (e.g. INFY, TCS, RELIANCE)..."
                    icon={
                        <svg className="w-5 h-5 text-brand-slate" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    }
                />
            </div>

            {/* Company Listing Grid */}
            <div className="space-y-3 text-left">
                <div className="flex items-baseline justify-between pl-1 font-mono text-[10px]">
                    <h4 className="font-bold text-brand-textMuted uppercase tracking-wider">
                        {searchQuery ? "Search Results" : "All Listed Equities"}
                    </h4>
                    <span className="text-brand-textMuted font-semibold uppercase">
                        Showing {filteredCompanies.length} symbols
                    </span>
                </div>

                {loading ? (
                    <ListSkeleton count={4} />
                ) : filteredCompanies.length === 0 ? (
                    <EmptyState
                        title="No symbols found"
                        message={`We couldn't find any listings matching "${searchQuery}".`}
                    />
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {filteredCompanies.map((company) => {
                            const compId = company.id || company.company_id;
                            const tracked = isTracked(compId);
                            const itemLoading = actionLoading === compId;

                            const mockPrice = (((company.id || 10) % 200) * 12 + 450).toFixed(2);
                            const mockChange = ((company.id || 10) % 2 === 0) ? "+1.4%" : "-0.7%";
                            const isPositive = ((company.id || 10) % 2 === 0);

                            return (
                                <div
                                    key={compId}
                                    onClick={() => handleToggleCompany(company)}
                                    className={`
                                        flex items-center justify-between p-4 bg-[#151921] rounded-2xl border cursor-pointer select-none font-mono
                                        ${tracked ? "border-[#33D097] shadow-sm shadow-[#33D097]/5 bg-[#33D097]/5" : "border-[#222A38] hover:border-[#222A38]/80 hover:bg-[#0C0E14]"}
                                        transition duration-150
                                    `}
                                >
                                    <div className="space-y-1.5 max-w-[65%] text-left">
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-extrabold text-[#E3E5EA] bg-[#0C0E14] px-2 py-0.5 border border-[#222A38] rounded">
                                                {company.symbol}
                                            </span>
                                            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-[#151921] border border-[#222A38] text-[#9298A0]">
                                                {company.id % 2 === 0 ? "NSE" : "BSE"}
                                            </span>
                                        </div>
                                        <span className="block text-xs font-bold text-[#9298A0] truncate font-sans">
                                            {company.company_name}
                                        </span>
                                    </div>

                                    {/* Stock Metrics and selection toggle */}
                                    <div className="flex items-center gap-4 shrink-0 text-right">
                                        <div>
                                            <span className="block text-xs font-bold text-[#E3E5EA]">
                                                ₹{mockPrice}
                                            </span>
                                            <span className={`block text-[10px] font-bold ${isPositive ? "text-[#33D097]" : "text-[#EF4444]"}`}>
                                                {isPositive ? "▲" : "▼"} {mockChange}
                                            </span>
                                        </div>

                                        <div className="shrink-0">
                                            {itemLoading ? (
                                                <svg className="animate-spin h-5 w-5 text-brand-cyan" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                </svg>
                                            ) : tracked ? (
                                                <div className="w-6 h-6 rounded-lg bg-[#33D097] text-[#0C0E14] flex items-center justify-center border border-[#33D097] transition">
                                                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                    </svg>
                                                </div>
                                            ) : (
                                                <div className="w-6 h-6 rounded-lg bg-[#0C0E14] border border-[#222A38] transition hover:border-[#33D097]/40" />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Sticky Save Button Bar fixed at bottom */}
            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#151921]/95 backdrop-blur border border-[#222A38] px-6 py-4 rounded-2xl shadow-2xl z-30 flex items-center justify-between gap-8 max-w-md w-[calc(100%-2rem)]">
                <div className="text-left font-mono">
                    <span className="block text-[10px] text-brand-textMuted font-bold uppercase tracking-wider">Watchlist Selected</span>
                    <span className="text-lg font-bold text-[#E3E5EA]">
                        {selectedCount} <span className="text-[#222A38]">/</span> {limit}
                    </span>
                </div>
                <button
                    onClick={() => navigate("/dashboard")}
                    className="bg-[#33D097] hover:bg-[#3BE6A7] text-[#0C0E14] rounded-xl py-3 px-6 font-bold text-sm transition duration-150 shadow-md focus:outline-none active:scale-[0.98]"
                >
                    Save Watchlist
                </button>
            </div>
        </div>
    );
}

export default CompanySelection;
