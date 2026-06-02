import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

/**
 * Mobile bottom navigation tab-bar simplified to Home (Dashboard) and Filings (Announcements).
 */
export function BottomNavigation() {
    const navigate = useNavigate();
    const location = useLocation();

    const tabs = [
        {
            label: "Terminal",
            path: "/dashboard",
            icon: (
                <svg className="w-5.5 h-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2z" />
                </svg>
            )
        },
        {
            label: "Watchlist",
            path: "/companies",
            icon: (
                <svg className="w-5.5 h-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
            )
        },
        {
            label: "Premium",
            path: "/plans",
            icon: (
                <svg className="w-5.5 h-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
            )
        },
        {
            label: "License",
            path: "/profile",
            icon: (
                <svg className="w-5.5 h-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 009 11.5V10c0-1.1.9-2 2-2h3c1.1 0 2 .9 2 2v1.5a13.913 13.913 0 00.75 3.97M9 11.5v-1.5a1.5 1.5 0 013 0v1.5M9 11.5c0 1.293.761 2.41 1.84 2.9m-1.84-2.9A3.478 3.478 0 0012 11c0-1.933-1.567-3.5-3.5-3.5S5 9.067 5 11c0 .96.388 1.83 1.016 2.461" />
                </svg>
            )
        }
    ];

    return (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0C0E14]/95 border-t border-[#222A38] text-[#E3E5EA] shadow-lg backdrop-blur-md pb-safe">
            <div className="flex justify-around items-center h-16 max-w-lg mx-auto">
                {tabs.map((tab, idx) => {
                    const isActive = location.pathname === tab.path;

                    return (
                        <button
                            key={idx}
                            onClick={() => navigate(tab.path)}
                            className="flex flex-col items-center justify-center w-full h-full text-[#9298A0] focus:outline-none transition-all duration-150"
                        >
                            <div className={`p-1 transition-all duration-150 ${isActive ? "text-[#33D097] scale-110" : "hover:text-[#E3E5EA]"}`}>
                                {tab.icon}
                            </div>
                            <span className={`text-[10px] font-semibold mt-0.5 tracking-wider uppercase ${isActive ? "text-[#33D097]" : "text-[#9298A0]"}`}>
                                {tab.label}
                            </span>
                        </button>
                    );
                })}
            </div>
        </nav>
    );
}

export default BottomNavigation;
