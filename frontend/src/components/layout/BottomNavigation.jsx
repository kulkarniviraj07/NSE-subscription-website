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
            label: "Home",
            path: "/dashboard",
            icon: (
                <svg className="w-5.5 h-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
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
