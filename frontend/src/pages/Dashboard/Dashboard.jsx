import React from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useApp from "../../hooks/useApp";

export function Dashboard() {
    const { user } = useAuth();
    const { selectedCompanies, currentSubscription } = useApp();
    const navigate = useNavigate();

    const selectedCount = selectedCompanies.length;
    const limit = currentSubscription
        ? currentSubscription.company_limit || currentSubscription.limit || 5
        : 5;

    const currentPlanName =
        currentSubscription?.plan_name ||
        currentSubscription?.name ||
        "FREE";

    const isPremium = currentPlanName === "PREMIUM";

    const marketWidgets = [
        {
            label: "NIFTY 50",
            status: "Live Tracking",
            path: "M 0 20 Q 20 10 40 18 T 80 5 T 120 12 T 160 8",
            id: "nifty",
        },
        {
            label: "BSE SENSEX",
            status: "Real-Time Feed",
            path: "M 0 18 Q 20 5 40 15 T 80 10 T 120 5",
            id: "sensex",
        },
        {
            label: "BANK NIFTY",
            status: "NSE/BSE Active",
            path: "M 0 22 Q 20 15 40 25 T 80 10 T 120 15",
            id: "banknifty",
        },
        {
            label: "INDIA VIX",
            status: "Announcements On",
            path: "M 0 10 Q 20 20 40 15 T 80 22 T 120 10",
            id: "vix",
            colSpan: true,
        },
    ];

    return (
        <div className="space-y-6 pb-8 font-sans text-[#EDF0F4] animate-fade-in">

            {/* ── WELCOME HERO CARD ─────────────────────────────────────── */}
            <div className="relative rounded-2xl overflow-hidden border border-[#1E2535] bg-[#0B0E16]">
                {/* Grid overlay */}
                <div
                    className="absolute inset-0 pointer-events-none opacity-20"
                    style={{
                        backgroundImage:
                            "linear-gradient(rgba(51,208,151,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(51,208,151,0.07) 1px, transparent 1px)",
                        backgroundSize: "28px 28px",
                    }}
                />
                {/* Ambient glow */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background:
                            "radial-gradient(ellipse 55% 100% at 90% 50%, rgba(51,208,151,0.09) 0%, transparent 70%)",
                    }}
                />

                <div className="relative z-10 p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="w-1.5 h-1.5 bg-[#33D097] rounded-full animate-pulse" />
                            <span className="text-[10px] font-mono font-bold text-[#33D097] uppercase tracking-widest">
                                Terminal Access Granted
                            </span>
                        </div>
                        <h1 className="font-display text-[28px] md:text-[34px] font-bold text-[#EDF0F4] tracking-tight leading-tight">
                            Welcome back,{" "}
                            <span
                                className="bg-clip-text text-transparent"
                                style={{
                                    backgroundImage:
                                        "linear-gradient(92deg, #33D097 0%, #2DD4BF 55%, #38BDF8 110%)",
                                }}
                            >
                                {user?.name?.split(" ")[0] || "User"}
                            </span>
                        </h1>
                        <p className="text-[#646E7E] text-sm mt-1.5">
                            Your market watchlist is live and monitoring NSE/BSE announcements.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-3 font-mono shrink-0">
                        <div className="px-4 py-3 rounded-xl bg-[#10141E] border border-[#1E2535] hover:border-[#33D097]/20 transition-colors text-left">
                            <span className="block text-[9px] text-[#646E7E] font-bold uppercase tracking-widest mb-1">
                                Mobile
                            </span>
                            <span className="text-sm font-bold text-[#EDF0F4]">
                                +91&nbsp;{user?.mobile || "N/A"}
                            </span>
                        </div>
                        <div className="px-4 py-3 rounded-xl bg-[#10141E] border border-[#1E2535] hover:border-[#33D097]/20 transition-colors text-left">
                            <span className="block text-[9px] text-[#646E7E] font-bold uppercase tracking-widest mb-1">
                                Active Plan
                            </span>
                            <span
                                className={`text-sm font-bold uppercase ${
                                    isPremium ? "text-[#33D097]" : "text-[#38BDF8]"
                                }`}
                            >
                                {currentPlanName}
                            </span>
                        </div>
                        <div className="px-4 py-3 rounded-xl bg-[#10141E] border border-[#1E2535] hover:border-[#33D097]/20 transition-colors text-left">
                            <span className="block text-[9px] text-[#646E7E] font-bold uppercase tracking-widest mb-1">
                                Watchlist
                            </span>
                            <span className="text-sm font-bold text-[#EDF0F4]">
                                {selectedCount}
                                <span className="text-[#1E2535] mx-1">/</span>
                                <span className="text-[#646E7E]">{limit}</span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── MARKET STATUS WIDGETS ─────────────────────────────────── */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 font-mono">
                {marketWidgets.map((w) => (
                    <div
                        key={w.id}
                        className={`p-4 bg-[#0B0E16] border border-[#1E2535] rounded-2xl hover:border-[#33D097]/30 hover:shadow-[0_0_28px_rgba(51,208,151,0.07)] transition-all duration-300 group${
                            w.colSpan ? " col-span-2 md:col-span-1" : ""
                        }`}
                    >
                        <div className="flex items-center justify-between mb-1">
                            <span className="text-[10px] text-[#646E7E] font-bold uppercase tracking-widest">
                                {w.label}
                            </span>
                            <span className="w-1.5 h-1.5 bg-[#33D097] rounded-full animate-pulse" />
                        </div>
                        <span className="text-[11px] font-bold text-[#33D097]">{w.status}</span>
                        <svg
                            className="w-full h-8 mt-2"
                            viewBox="0 0 160 30"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <defs>
                                <linearGradient
                                    id={`spark-${w.id}`}
                                    x1="0%"
                                    y1="0%"
                                    x2="100%"
                                    y2="0%"
                                >
                                    <stop offset="0%" stopColor="#33D097" stopOpacity="0.5" />
                                    <stop offset="100%" stopColor="#38BDF8" stopOpacity="1" />
                                </linearGradient>
                            </defs>
                            <path
                                d={w.path}
                                stroke={`url(#spark-${w.id})`}
                                strokeWidth="1.5"
                                strokeLinecap="round"
                            />
                        </svg>
                    </div>
                ))}
            </div>

            {/* ── WATCHLIST + SUBSCRIPTION ──────────────────────────────── */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Watchlist Card */}
                <div className="relative rounded-2xl overflow-hidden bg-[#0B0E16] border border-[#1E2535] hover:border-[#33D097]/20 transition-all duration-300 flex flex-col min-h-[340px]">
                    <div
                        className="absolute top-0 right-0 w-48 h-48 pointer-events-none"
                        style={{
                            background:
                                "radial-gradient(circle at top right, rgba(51,208,151,0.08) 0%, transparent 65%)",
                        }}
                    />

                    <div className="relative z-10 p-6 flex flex-col flex-1">
                        {/* Card header */}
                        <div className="flex items-center justify-between mb-5">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-xl bg-[#33D097]/10 border border-[#33D097]/20 flex items-center justify-center">
                                    <svg
                                        className="w-4 h-4 text-[#33D097]"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                                        />
                                    </svg>
                                </div>
                                <h3 className="font-display text-[17px] font-bold text-[#EDF0F4]">
                                    Watchlist Builder
                                </h3>
                            </div>
                            <span className="text-[10px] font-mono font-bold text-[#33D097] bg-[#33D097]/10 px-2.5 py-1 border border-[#33D097]/20 rounded-lg uppercase tracking-wider">
                                {selectedCount}/{limit}&nbsp;Active
                            </span>
                        </div>

                        {/* Company list / empty state */}
                        <div className="flex-1">
                            {selectedCount === 0 ? (
                                <div className="flex flex-col items-center justify-center h-full py-8 text-center">
                                    <div className="w-12 h-12 rounded-xl bg-[#10141E] border border-[#1E2535] flex items-center justify-center mb-3">
                                        <svg
                                            className="w-5 h-5 text-[#646E7E]"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M12 4v16m8-8H4"
                                            />
                                        </svg>
                                    </div>
                                    <p className="text-[#646E7E] text-sm">No tickers configured yet.</p>
                                    <p className="text-[#646E7E]/60 text-xs mt-1">
                                        Add NSE/BSE stocks to your watchlist below.
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-2 max-h-[210px] overflow-y-auto custom-scrollbar pr-1">
                                    {selectedCompanies.map((c) => (
                                        <div
                                            key={c.id || c.company_id}
                                            className="flex items-center justify-between p-3 rounded-xl bg-[#10141E] border border-[#1E2535] hover:border-[#33D097]/30 hover:bg-[#141927] transition-all duration-200 font-mono group"
                                        >
                                            <div className="flex items-center gap-3 min-w-0">
                                                <div className="w-11 h-8 rounded-lg bg-[#0B0E16] border border-[#1E2535] group-hover:border-[#33D097]/30 text-[#33D097] font-bold text-[10px] flex items-center justify-center shrink-0 transition-colors">
                                                    {(c.symbol || c.code || "CMP").slice(0, 5)}
                                                </div>
                                                <div className="min-w-0">
                                                    <span className="block text-xs font-bold text-[#EDF0F4] truncate">
                                                        {c.company_name || c.name || "Company"}
                                                    </span>
                                                    <span className="block text-[9px] text-[#646E7E] font-bold uppercase tracking-wider mt-0.5">
                                                        NSE · BSE
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-1.5 shrink-0 ml-3">
                                                <span className="w-1.5 h-1.5 bg-[#33D097] rounded-full animate-pulse" />
                                                <span className="text-[10px] font-bold text-[#33D097]">Active</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <button
                            onClick={() => navigate("/companies")}
                            className="mt-5 w-full py-3 rounded-xl font-bold text-sm bg-[#33D097] hover:bg-[#3BE6A7] text-[#04130C] transition-all duration-200 shadow-[0_4px_20px_rgba(51,208,151,0.22)] hover:shadow-[0_4px_28px_rgba(51,208,151,0.38)] active:scale-[0.98]"
                        >
                            Configure Watchlist Tickers
                        </button>
                    </div>
                </div>

                {/* Subscription / License Card */}
                <div
                    className="relative rounded-2xl overflow-hidden flex flex-col min-h-[340px] transition-all duration-300"
                    style={{
                        background: isPremium
                            ? "linear-gradient(145deg, #0B0E16 0%, #0D1520 100%)"
                            : "#0B0E16",
                        border: isPremium
                            ? "1px solid rgba(51,208,151,0.28)"
                            : "1px solid #1E2535",
                        boxShadow: isPremium
                            ? "0 0 40px rgba(51,208,151,0.06)"
                            : "none",
                    }}
                >
                    {isPremium && (
                        <>
                            <div
                                className="absolute top-0 left-0 right-0 h-px pointer-events-none"
                                style={{
                                    background:
                                        "linear-gradient(90deg, transparent 10%, rgba(51,208,151,0.5) 50%, transparent 90%)",
                                }}
                            />
                            <div
                                className="absolute inset-0 pointer-events-none"
                                style={{
                                    background:
                                        "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(51,208,151,0.07) 0%, transparent 70%)",
                                }}
                            />
                        </>
                    )}

                    <div className="relative z-10 p-6 flex flex-col flex-1">
                        {/* Card header */}
                        <div className="flex items-center justify-between mb-5">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-xl bg-[#33D097]/10 border border-[#33D097]/20 flex items-center justify-center">
                                    <svg
                                        className="w-4 h-4 text-[#33D097]"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                                        />
                                    </svg>
                                </div>
                                <h3 className="font-display text-[17px] font-bold text-[#EDF0F4]">
                                    Terminal License
                                </h3>
                            </div>
                            <span className="text-[10px] font-mono font-bold text-[#33D097] bg-[#33D097]/10 px-2.5 py-1 border border-[#33D097]/20 rounded-lg uppercase tracking-wider">
                                Verified
                            </span>
                        </div>

                        <div className="flex-1">
                            <span className="text-[10px] font-mono font-bold text-[#646E7E] uppercase tracking-widest">
                                License Tier
                            </span>
                            <div className="mt-2 flex items-baseline gap-3">
                                <span className="font-display text-[44px] font-bold text-[#EDF0F4] tracking-tight leading-none">
                                    {currentPlanName}
                                </span>
                                <span className="text-[10px] font-mono font-bold px-2 py-1 rounded-lg bg-[#33D097]/10 text-[#33D097] border border-[#33D097]/20 uppercase tracking-wider">
                                    Active
                                </span>
                            </div>
                            <p className="text-[#98A0AE] text-sm mt-4 leading-relaxed">
                                {isPremium
                                    ? "Professional license active. Full terminal access to Nifty 500 with instant priority dispatch alerts."
                                    : "Starter license active. Monitored alerts covering up to 5 NSE/BSE stocks with standard dispatch."}
                            </p>

                            <div className="mt-5 grid grid-cols-2 gap-3 font-mono">
                                <div className="px-3 py-2.5 rounded-xl bg-[#10141E] border border-[#1E2535]">
                                    <span className="block text-[9px] text-[#646E7E] font-bold uppercase tracking-widest mb-1">
                                        Companies
                                    </span>
                                    <span className="text-sm font-bold text-[#EDF0F4]">
                                        {isPremium ? "500" : "5"} max
                                    </span>
                                </div>
                                <div className="px-3 py-2.5 rounded-xl bg-[#10141E] border border-[#1E2535]">
                                    <span className="block text-[9px] text-[#646E7E] font-bold uppercase tracking-widest mb-1">
                                        Alert Speed
                                    </span>
                                    <span className="text-sm font-bold text-[#EDF0F4]">
                                        {isPremium ? "Priority" : "Standard"}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={() => navigate("/plans")}
                            className={`mt-5 w-full py-3 rounded-xl font-bold text-sm transition-all duration-200 active:scale-[0.98] ${
                                isPremium
                                    ? "bg-[#10141E] border border-[#1E2535] hover:border-[#33D097]/30 text-[#33D097] hover:bg-[#141927]"
                                    : "bg-[#33D097] hover:bg-[#3BE6A7] text-[#04130C] shadow-[0_4px_20px_rgba(51,208,151,0.22)] hover:shadow-[0_4px_28px_rgba(51,208,151,0.38)]"
                            }`}
                        >
                            {isPremium ? "Manage License" : "Upgrade to Premium"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
