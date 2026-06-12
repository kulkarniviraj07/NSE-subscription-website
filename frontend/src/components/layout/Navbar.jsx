import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export function Navbar({ setMobileOpen, collapsed }) {
    const { user, logout } = useAuth();
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
    const location = useLocation();

    const getPageMeta = () => {
        const path = location.pathname;
        if (path === "/dashboard")    return { title: "Dashboard",         sub: "Overview" };
        if (path === "/companies")    return { title: "Watchlist Builder",  sub: "Companies" };
        if (path === "/announcements")return { title: "Announcements",      sub: "Feed" };
        if (path === "/profile")      return { title: "Account Settings",   sub: "Profile" };
        if (path === "/plans")        return { title: "Subscription Center",sub: "Plans" };
        return { title: "Workspace", sub: "Portal" };
    };

    const { title, sub } = getPageMeta();

    const getUserInitial = () => {
        if (!user?.name) return "U";
        return user.name.charAt(0).toUpperCase();
    };

    const marketChips = [
        { label: "NIFTY 50",  status: "ACTIVE" },
        { label: "SENSEX",    status: "ACTIVE" },
        { label: "INDIA VIX", status: "MONITORED" },
    ];

    return (
        <header className="sticky top-0 z-30 h-16 bg-[#07090F]/90 backdrop-blur-[18px] border-b border-[#1E2535] flex items-center justify-between px-5 gap-4 transition-all duration-200">

            {/* ── LEFT: mobile burger + page title ─────────────────────── */}
            <div className="flex items-center gap-3 min-w-0">
                <button
                    onClick={() => setMobileOpen(true)}
                    className="p-2 -ml-1.5 rounded-xl text-[#646E7E] hover:text-[#EDF0F4] hover:bg-[#10141E] md:hidden transition-colors shrink-0"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>

                <div className="flex flex-col text-left min-w-0">
                    <span className="text-[9px] font-mono font-bold text-[#646E7E] uppercase tracking-widest">
                        Watchlist Portal &nbsp;/&nbsp; {sub}
                    </span>
                    <span className="text-[14px] font-display font-bold text-[#EDF0F4] tracking-tight leading-tight truncate">
                        {title}
                    </span>
                </div>
            </div>

            {/* ── CENTRE: market status chips ───────────────────────────── */}
            <div className="hidden lg:flex items-center gap-2.5 font-mono text-[11px]">
                {marketChips.map((chip) => (
                    <div
                        key={chip.label}
                        className="flex items-center gap-2 px-3 py-1.5 bg-[#0B0E16] border border-[#1E2535] rounded-lg hover:border-[#33D097]/25 transition-colors"
                    >
                        <span className="text-[#98A0AE] font-bold tracking-wide">{chip.label}</span>
                        <span className="w-1.5 h-1.5 bg-[#33D097] rounded-full animate-pulse" />
                        <span className="text-[#33D097] font-bold">{chip.status}</span>
                    </div>
                ))}
            </div>

            {/* ── RIGHT: session badge + profile ────────────────────────── */}
            <div className="flex items-center gap-3 shrink-0">
                {/* Session badge */}
                <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0B0E16] border border-[#1E2535] text-[#33D097] text-[10px] font-mono font-bold tracking-wider uppercase">
                    <span className="w-1.5 h-1.5 bg-[#33D097] rounded-full animate-pulse" />
                    Secure Session
                </div>

                {/* Profile button */}
                <div className="relative">
                    <button
                        onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                        className="flex items-center gap-2.5 p-1.5 rounded-xl border border-[#1E2535] hover:border-[#33D097]/30 hover:bg-[#0B0E16] transition-all duration-150"
                    >
                        {/* Avatar */}
                        <div
                            className="w-8 h-8 rounded-lg flex items-center justify-center text-[#04130C] text-sm font-bold shadow-[0_2px_12px_rgba(51,208,151,0.25)] shrink-0"
                            style={{
                                background:
                                    "linear-gradient(135deg, #33D097 0%, #38BDF8 100%)",
                            }}
                        >
                            {getUserInitial()}
                        </div>
                        <div className="hidden sm:flex flex-col text-left pr-1">
                            <span className="text-[12px] font-bold text-[#EDF0F4] truncate max-w-[110px] leading-tight">
                                {user?.name || "User"}
                            </span>
                            <span className="text-[10px] text-[#646E7E] font-mono">
                                +91&nbsp;{user?.mobile || "N/A"}
                            </span>
                        </div>
                        <svg
                            className={`w-3.5 h-3.5 text-[#646E7E] transition-transform duration-200 ${
                                profileDropdownOpen ? "rotate-180" : ""
                            }`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>

                    {/* Dropdown */}
                    {profileDropdownOpen && (
                        <>
                            <div
                                className="fixed inset-0 z-40"
                                onClick={() => setProfileDropdownOpen(false)}
                            />
                            <div className="absolute right-0 mt-2.5 w-52 bg-[#0B0E16] border border-[#1E2535] rounded-2xl shadow-[0_16px_48px_rgba(0,0,0,0.6)] z-50 p-2 animate-fade-in text-left overflow-hidden">
                                {/* Top gradient line */}
                                <div
                                    className="absolute top-0 left-0 right-0 h-px"
                                    style={{
                                        background:
                                            "linear-gradient(90deg, transparent 10%, rgba(51,208,151,0.4) 50%, transparent 90%)",
                                    }}
                                />
                                <div className="px-3 py-2.5 border-b border-[#1E2535] mb-1">
                                    <span className="block text-[9px] font-mono font-bold text-[#646E7E] uppercase tracking-widest">
                                        Active Profile
                                    </span>
                                    <span className="block text-xs font-bold text-[#EDF0F4] mt-0.5 truncate">
                                        {user?.name || "User"}
                                    </span>
                                </div>
                                <button
                                    onClick={() => {
                                        setProfileDropdownOpen(false);
                                        logout();
                                    }}
                                    className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left text-xs font-bold text-red-400 hover:bg-red-950/20 hover:border-red-900/30 border border-transparent transition-all duration-150"
                                >
                                    <svg
                                        className="w-4 h-4 shrink-0"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                        />
                                    </svg>
                                    Logout
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Navbar;
