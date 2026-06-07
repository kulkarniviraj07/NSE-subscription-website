import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

/**
 * Clean SaaS Sidebar component supporting minimal navigation: Dashboard and Announcements.
 */
export function Sidebar({ collapsed, setCollapsed, mobileOpen, setMobileOpen }) {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
        {
            name: "Terminal Dashboard",
            path: "/dashboard",
            icon: (
                <svg className="w-5.5 h-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    {/* Trading Terminal / Candlestick Chart Icon */}
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2z" />
                </svg>
            )
        },
        {
            name: "Watchlist Builder",
            path: "/companies",
            icon: (
                <svg className="w-5.5 h-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    {/* Watchlist / Document list check Icon */}
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
            )
        },
        {
            name: "Subscription Center",
            path: "/plans",
            icon: (
                <svg className="w-5.5 h-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    {/* Market badge / Shield Key Icon */}
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
            )
        },
        {
            name: "Account Settings",
            path: "/profile",
            icon: (
                <svg className="w-5.5 h-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    {/* User profile / Security key Icon */}
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 009 11.5V10c0-1.1.9-2 2-2h3c1.1 0 2 .9 2 2v1.5a13.913 13.913 0 00.75 3.97M9 11.5v-1.5a1.5 1.5 0 013 0v1.5M9 11.5c0 1.293.761 2.41 1.84 2.9m-1.84-2.9A3.478 3.478 0 0012 11c0-1.933-1.567-3.5-3.5-3.5S5 9.067 5 11c0 .96.388 1.83 1.016 2.461" />
                </svg>
            )
        }
    ];

    const handleNavigation = (path) => {
        navigate(path);
        setMobileOpen(false);
    };

    const sidebarClass = `
        fixed top-0 bottom-0 left-0 z-40
        hidden md:flex flex-col
        bg-[#0C0E14] text-[#E3E5EA]
        border-r border-[#222A38]
        transition-all duration-300 ease-in-out
        ${collapsed ? "w-20" : "w-64"}
        ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
    `;

    return (
        <>
            {/* Mobile overlay backdrop */}
            {mobileOpen && (
                <div
                    className="fixed inset-0 z-30 bg-[#0C0E14]/60 backdrop-blur-sm md:hidden"
                    onClick={() => setMobileOpen(false)}
                />
            )}

            <aside className={sidebarClass}>
                {/* Header Brand */}
                <div className="h-16 flex items-center justify-between px-5 border-b border-[#222A38]">
                    <div className="flex items-center gap-3 overflow-hidden">
                        <div className="min-w-10 min-h-10 rounded-xl bg-[#151921] border border-[#222A38] flex items-center justify-center text-[#33D097] shadow-sm">
                            <span className="font-extrabold text-base tracking-wider">EA</span>
                        </div>
                        {!collapsed && (
                            <span className="font-bold text-lg tracking-tight text-[#E3E5EA]">
                                EquityAlerts
                            </span>
                        )}
                    </div>
                    
                    {/* Collapsible toggle for Desktop */}
                    <button
                        onClick={() => setCollapsed(!collapsed)}
                        className="hidden md:flex p-1.5 rounded-lg text-[#9298A0] hover:text-[#E3E5EA] hover:bg-[#151921] transition-colors"
                    >
                        <svg className={`w-5 h-5 transform transition-transform ${collapsed ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                </div>

                {/* Main Navigation Links */}
                <nav className="flex-1 py-6 px-3 space-y-1.5 overflow-y-auto custom-scrollbar text-left">
                    {menuItems.map((item, idx) => {
                        const isActive = location.pathname === item.path;

                        return (
                            <button
                                key={idx}
                                onClick={() => handleNavigation(item.path)}
                                className={`
                                    w-full flex items-center gap-3 py-3 rounded-xl font-semibold text-sm
                                    transition-all duration-150 group
                                    ${isActive
                                        ? "bg-[#151921] text-[#E3E5EA] border-l-4 border-[#33D097] pl-[12px] font-bold"
                                        : "text-[#9298A0] hover:text-[#E3E5EA] hover:bg-[#151921] border-l-4 border-transparent pl-[12px]"}
                                `}
                            >
                                <span className={isActive ? "text-[#33D097]" : "text-[#9298A0] group-hover:text-[#E3E5EA] transition-colors"}>
                                    {item.icon}
                                </span>
                                {!collapsed && (
                                    <span className="truncate flex-1 text-left">
                                        {item.name}
                                    </span>
                                )}
                            </button>
                        );
                    })}
                </nav>

                {/* Sidebar Footer / Sign Out */}
                <div className="p-3 border-t border-[#222A38] bg-[#151921]/40">
                    <button
                        onClick={logout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm text-red-400 hover:text-red-300 hover:bg-red-950/20 transition-all duration-150"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        {!collapsed && <span className="truncate">Logout</span>}
                    </button>
                </div>
            </aside>
        </>
    );
}

export default Sidebar;
