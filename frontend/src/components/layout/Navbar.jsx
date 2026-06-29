import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function Navbar({ setMobileOpen }) {
    const { user, logout } = useAuth();
    const location = useLocation();

    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

    const getPageMeta = () => {
        switch (location.pathname) {
            case "/dashboard":
                return {
                    title: "Dashboard",
                    sub: "Overview",
                };

            case "/companies":
                return {
                    title: "Watchlist Builder",
                    sub: "Companies",
                };

            case "/announcements":
                return {
                    title: "Announcements",
                    sub: "Feed",
                };

            case "/profile":
                return {
                    title: "Account Settings",
                    sub: "Profile",
                };

            case "/plans":
                return {
                    title: "Subscription Center",
                    sub: "Plans",
                };

            default:
                return {
                    title: "Workspace",
                    sub: "Portal",
                };
        }
    };

    const { title, sub } = getPageMeta();

    const getUserInitial = () => {
        if (!user?.name) return "U";
        return user.name.charAt(0).toUpperCase();
    };

    const marketChips = [
        {
            label: "NIFTY 50",
            status: "ACTIVE",
        },
        {
            label: "SENSEX",
            status: "ACTIVE",
        },
        {
            label: "INDIA VIX",
            status: "MONITORED",
        },
    ];

    return (
        <header className="sticky top-0 z-30 h-16 bg-[#07090F]/90 backdrop-blur-xl border-b border-[#1E2535]">

            <div className="h-full flex items-center justify-between px-5">

                {/* Left */}

                <div className="flex items-center gap-3">

                    <button
                        onClick={() => setMobileOpen?.(true)}
                        className="md:hidden p-2 rounded-lg hover:bg-[#10141E]"
                    >
                        <svg
                            className="w-5 h-5 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </button>

                    <div>

                        <p className="text-[10px] uppercase tracking-[2px] text-[#646E7E]">
                            Watchlist Portal / {sub}
                        </p>

                        <h1 className="text-white text-lg font-bold">
                            {title}
                        </h1>

                    </div>

                </div>

                {/* Center */}

                <div className="hidden lg:flex gap-3">

                    {marketChips.map((chip) => (

                        <div
                            key={chip.label}
                            className="px-3 py-2 rounded-xl bg-[#0B0E16] border border-[#1E2535] flex items-center gap-2"
                        >

                            <span className="text-[#98A0AE] text-xs font-bold">
                                {chip.label}
                            </span>

                            <span className="w-2 h-2 rounded-full bg-[#33D097]" />

                            <span className="text-[#33D097] text-xs font-bold">
                                {chip.status}
                            </span>

                        </div>

                    ))}

                </div>

                {/* Right */}

                <div className="flex items-center gap-3">

                    <div className="hidden md:flex items-center gap-2 px-3 py-2 rounded-full border border-[#1E2535] bg-[#0B0E16]">

                        <span className="w-2 h-2 rounded-full bg-[#33D097]" />

                        <span className="text-[#33D097] text-xs font-bold">
                            Secure Session
                        </span>

                    </div>

                    <div className="relative">

                        <button
                            onClick={() =>
                                setProfileDropdownOpen(!profileDropdownOpen)
                            }
                            className="flex items-center gap-3 border border-[#1E2535] rounded-xl px-2 py-1.5 hover:border-[#33D097]"
                        >

                            <div className="w-9 h-9 rounded-lg bg-gradient-to-r from-[#33D097] to-[#38BDF8] flex items-center justify-center font-bold text-black">

                                {getUserInitial()}

                            </div>

                            <div className="hidden md:block text-left">

                                <p className="text-sm font-semibold text-white">

                                    {user?.name || "User"}

                                </p>

                                <p className="text-xs text-[#98A0AE]">

                                    +91 {user?.mobile || "N/A"}

                                </p>

                            </div>

                        </button>

                        {profileDropdownOpen && (

                            <div className="absolute right-0 mt-3 w-56 bg-[#0B0E16] border border-[#1E2535] rounded-xl shadow-2xl">

                                <div className="p-4 border-b border-[#1E2535]">

                                    <p className="text-xs uppercase tracking-wider text-[#646E7E]">

                                        Active Profile

                                    </p>

                                    <p className="text-white font-semibold mt-1">

                                        {user?.name || "User"}

                                    </p>

                                </div>

                                <button
                                    onClick={() => {
                                        setProfileDropdownOpen(false);
                                        logout();
                                    }}
                                    className="w-full text-left px-4 py-3 text-red-400 hover:bg-red-900/20"
                                >
                                    Logout
                                </button>

                            </div>

                        )}

                    </div>

                </div>

            </div>

        </header>
    );
}