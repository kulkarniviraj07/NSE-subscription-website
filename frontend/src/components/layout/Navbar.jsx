import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

/**
 * Clean SaaS Top horizontal Navbar for the Dashboard layout.
 */
export function Navbar({ setMobileOpen, collapsed }) {
    const { user, logout } = useAuth();
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
    const location = useLocation();

    // Map pathnames to simplified SaaS visual headers
    const getPageTitle = () => {
        const path = location.pathname;
        if (path === "/dashboard") return "Dashboard";
        if (path === "/companies") return "Company Selection";
        if (path === "/announcements") return "Announcements";
        if (path === "/profile") return "Profile";
        if (path === "/plans") return "Plans";
        return "Workspace";
    };

    // User initial for circular avatar icon
    const getUserInitial = () => {
        if (!user || !user.name) return "U";
        return user.name.charAt(0).toUpperCase();
    };

    return (
        <header className="sticky top-0 z-30 h-16 bg-brand-navy/90 backdrop-blur-md border-b border-brand-border flex items-center justify-between px-6 transition-all duration-200">
            {/* Left Portion: Mobile menu burger and welcome path */}
            <div className="flex items-center gap-4">
                <button
                    onClick={() => setMobileOpen(true)}
                    className="p-2 -ml-2 rounded-xl text-brand-slate hover:text-brand-light hover:bg-brand-dark md:hidden transition-colors"
                >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>

                <div className="flex flex-col text-left">
                    <span className="text-[10px] font-bold text-brand-textMuted uppercase tracking-wider pl-0.5">
                        Watchlist Portal
                    </span>
                    <span className="text-sm font-bold text-brand-light tracking-tight">
                        {getPageTitle()}
                    </span>
                </div>
            </div>

            {/* Middle Portion: Live Market Indices Trackers (Bloomberg style) */}
            <div className="hidden lg:flex items-center gap-6 text-xs font-mono">
                <div className="flex items-center gap-2 px-3 py-1 bg-brand-dark border border-brand-border rounded-lg">
                    <span className="text-[#9298A0] font-bold">NIFTY 50</span>
                    <span className="text-brand-light font-bold">24,115.50</span>
                    <span className="text-brand-cyan flex items-center font-bold">
                        ▲ +1.2%
                    </span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-brand-dark border border-brand-border rounded-lg">
                    <span className="text-[#9298A0] font-bold">SENSEX</span>
                    <span className="text-brand-light font-bold">79,250.20</span>
                    <span className="text-brand-cyan flex items-center font-bold">
                        ▲ +1.1%
                    </span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-brand-dark border border-brand-border rounded-lg">
                    <span className="text-[#9298A0] font-bold">INDIA VIX</span>
                    <span className="text-brand-light font-bold">13.45</span>
                    <span className="text-red-400 flex items-center font-bold">
                        ▼ -3.4%
                    </span>
                </div>
            </div>

            {/* Right Portion: Connection indicator and Profile menu */}
            <div className="flex items-center gap-4">
                {/* Connection Status tag */}
                <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-dark border border-brand-border text-brand-cyan text-[11px] font-semibold tracking-wider uppercase">
                    <span className="w-1.5 h-1.5 bg-brand-cyan rounded-full animate-pulse" />
                    Terminal Session Secure
                </div>

                {/* Profile menu */}
                <div className="relative">
                    <button
                        onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                        className="flex items-center gap-2.5 p-1.5 rounded-xl border border-brand-border hover:border-brand-cyan/40 hover:bg-brand-dark transition duration-150"
                    >
                        <div className="w-8 h-8 rounded-lg bg-brand-dark border border-brand-border text-brand-cyan text-sm font-bold flex items-center justify-center shadow-sm">
                            {getUserInitial()}
                        </div>
                        <div className="hidden sm:flex flex-col text-left pr-1.5">
                            <span className="text-xs font-bold text-brand-light truncate max-w-[120px]">
                                {user?.name || "User"}
                            </span>
                            <span className="text-[10px] text-brand-slate font-semibold">
                                +91 {user?.mobile || "N/A"}
                            </span>
                        </div>
                        <svg
                            className={`w-3.5 h-3.5 text-brand-slate transition-transform duration-200 ${profileDropdownOpen ? "rotate-180" : ""}`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>

                    {/* Profile Dropdown Menu */}
                    {profileDropdownOpen && (
                        <>
                            <div
                                className="fixed inset-0 z-40"
                                onClick={() => setProfileDropdownOpen(false)}
                            />
                            <div className="absolute right-0 mt-2.5 w-52 bg-brand-dark border border-brand-border rounded-2xl shadow-xl z-50 p-2 animate-fade-in text-left">
                                <div className="px-3 py-2.5 border-b border-brand-border">
                                    <span className="block text-[10px] font-bold text-brand-textMuted uppercase tracking-wider">
                                        Active Profile
                                    </span>
                                    <span className="block text-xs font-bold text-brand-light mt-0.5 truncate">
                                        {user?.name || "User"}
                                    </span>
                                </div>
                                <button
                                    onClick={() => {
                                        setProfileDropdownOpen(false);
                                        logout();
                                    }}
                                    className="w-full flex items-center gap-2.5 px-3 py-2.5 mt-1.5 rounded-xl text-left text-xs font-bold text-red-400 hover:bg-red-950/20 transition"
                                >
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
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
