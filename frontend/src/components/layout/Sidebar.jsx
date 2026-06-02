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
            name: "Dashboard",
            path: "/dashboard",
            icon: (
                <svg className="w-5.5 h-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4zM14 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4z" />
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
                            <span className="font-extrabold text-base tracking-wider">PF</span>
                        </div>
                        {!collapsed && (
                            <span className="font-bold text-lg tracking-tight text-[#E3E5EA]">
                                PureFrames
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
