import React from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useApp from "../../hooks/useApp";
import Button from "../../components/ui/Button";

/**
 * High-fidelity, mobile-first Profile and Settings View.
 */
export function Profile() {
    const { user, logout } = useAuth();
    const { currentSubscription, selectedCompanies } = useApp();
    console.log(
        "CURRENT SUBSCRIPTION:",
        currentSubscription
    );
    const navigate = useNavigate();

    // Initials helper
    const getInitials = () => {
        if (!user || !user.name) return "U";
        return user.name.slice(0, 2).toUpperCase();
    };

    // Date formatter
    const formatDate = (isoString) => {
        if (!isoString) return "Lifetime";
        try {
            const date = new Date(isoString);
            return date.toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric"
            });
        } catch {
            return "N/A";
        }
    };

    const isPremium = currentSubscription?.plan_name === "PREMIUM";

    return (
        <div className="space-y-6 pb-8 font-sans">
            {/* User Profile Avatar Card */}
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-md flex flex-col items-center text-center space-y-4">
                <div className="w-20 h-20 bg-brand-navy rounded-3xl text-white text-3xl font-black flex items-center justify-center shadow-lg glow-cyan border-2 border-brand-cyan/20">
                    {getInitials()}
                </div>

                <div className="space-y-1">
                    <h2 className="text-xl font-extrabold text-brand-navy tracking-tight">
                        {user?.name || "PureFrames User"}
                    </h2>
                    <span className="block text-xs font-semibold text-slate-400">
                        Active Account Member
                    </span>
                </div>
            </div>

            {/* Profile Info Details List */}
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-md space-y-4 text-left">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-50 pb-2 mb-1">
                    Contact Details
                </h3>

                <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                        <span className="block text-slate-400 font-medium">Full Name</span>
                        <span className="font-bold text-brand-navy mt-0.5 block truncate">
                            {user?.name || "PureFrames User"}
                        </span>
                    </div>
                    <div>
                        <span className="block text-slate-400 font-medium">Mobile Number</span>
                        <span className="font-bold text-brand-navy mt-0.5 block">
                            +91 {user?.mobile || "N/A"}
                        </span>
                    </div>
                </div>
            </div>

            {/* Subscription & Active Limits details */}
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-md text-left space-y-5">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-50 pb-2">
                    Active Subscription Plan
                </h3>

                {!currentSubscription ? (
                    <div className="text-center py-4 space-y-4">
                        <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center mx-auto">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>

                        <div className="space-y-1">
                            <h4 className="text-sm font-extrabold text-brand-navy">
                                No active plan found
                            </h4>
                            <p className="text-slate-400 text-xs max-w-xs mx-auto leading-relaxed">
                                Activate a plan now to monitor announcements and receive instant regulatory alerts.
                            </p>
                        </div>

                        <Button onClick={() => navigate("/plans")} variant="primary" className="w-full">
                            Activate Subscription
                        </Button>
                    </div>
                ) : (
                    <div className="space-y-5">
                        {/* Plan tag */}
                        <div className={`p-4 rounded-2xl border flex items-center justify-between ${isPremium ? "bg-cyan-950/25 border-brand-cyan/20 text-white" : "bg-slate-50 border-slate-100"}`}>
                            <div className="space-y-1">
                                <span className={`text-[10px] font-bold uppercase tracking-wider block ${isPremium ? "text-brand-cyan" : "text-slate-400"}`}>
                                    Active Tier
                                </span>
                                <span className={`text-base font-black ${isPremium ? "text-white" : "text-brand-navy"}`}>
                                    {currentSubscription.plan_name} PLAN
                                </span>
                            </div>

                            <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase ${isPremium ? "bg-brand-cyan text-brand-navy" : "bg-slate-200 text-slate-600"}`}>
                                {isPremium ? "PREMIUM" : "FREE"}
                            </span>
                        </div>

                        {/* Watchlist Gauge */}
                        <div className="space-y-2 text-xs">
                            <div className="flex items-center justify-between font-bold">
                                <span className="text-slate-400">Tracked Companies capacity</span>
                                <span className="text-brand-navy">
                                    {selectedCompanies.length} / {currentSubscription.company_limit}
                                </span>
                            </div>

                            {/* visual progress gauge bar */}
                            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-brand-cyan transition-all duration-300 rounded-full"
                                    style={{
                                        width: `${Math.min(100, (selectedCompanies.length / currentSubscription.company_limit) * 100)}%`
                                    }}
                                />
                            </div>
                        </div>

                        {/* Calendar Details */}
                        <div className="grid grid-cols-2 gap-4 text-xs border-t border-slate-50 pt-4.5">
                            <div>
                                <span className="block text-slate-400 font-medium">Billing Period</span>
                                <span className="font-bold text-brand-navy mt-0.5 block uppercase">
                                    {isPremium ? "Monthly" : "Lifetime"}
                                </span>
                            </div>
                            <div>
                                <span className="block text-slate-400 font-medium">Expiry / Renewal</span>
                                <span className="font-bold text-brand-navy mt-0.5 block truncate">
                                    {formatDate(currentSubscription.ends_at)}
                                </span>
                            </div>
                        </div>

                        {/* Upgrade Banner for Free Users */}
                        {!isPremium && (
                            <div className="p-4 bg-cyan-50/50 border border-cyan-100 text-left rounded-2xl space-y-3.5 mt-2">
                                <div className="space-y-1">
                                    <h4 className="text-xs font-black text-brand-navy uppercase tracking-wider">
                                        Need to track more stocks?
                                    </h4>
                                    <p className="text-[11px] text-slate-500 leading-relaxed">
                                        Upgrade your watchlist limits from 5 to 25 companies and receive accelerated SMS dispatch triggers!
                                    </p>
                                </div>

                                <Button onClick={() => navigate("/plans")} variant="primary" className="w-full !h-9 text-xs">
                                    Upgrade Watchlist Limit
                                </Button>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Logout Panel */}
            <div className="px-1.5">
                <Button
                    onClick={logout}
                    variant="outline"
                    className="w-full !text-red-500 hover:!bg-red-50 !border-red-100"
                >
                    Sign Out Account
                </Button>
            </div>
        </div>
    );
}

export default Profile;
