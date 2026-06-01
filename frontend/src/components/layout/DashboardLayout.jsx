import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import BottomNavigation from "./BottomNavigation";

/**
 * Dashboard Layout coordinating Navbar, Sidebar, and child dashboard paths.
 */
export function DashboardLayout() {
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
            {/* Sidebar (Fixed Navigation Drawer for Desktop) */}
            <Sidebar
                collapsed={collapsed}
                setCollapsed={setCollapsed}
                mobileOpen={mobileOpen}
                setMobileOpen={setMobileOpen}
            />

            {/* Main Application Workspace */}
            <div
                className={`
                    flex-1 flex flex-col min-h-screen min-w-0
                    transition-all duration-300 ease-in-out
                    ${collapsed ? "md:pl-20" : "md:pl-64"}
                    pb-20 md:pb-0
                `}
            >
                {/* Navbar (Sticky Header) */}
                <Navbar
                    setMobileOpen={setMobileOpen}
                    collapsed={collapsed}
                />

                {/* Core Scrollable Panel Page */}
                <main className="flex-1 p-4 md:p-8 max-w-7xl w-full mx-auto animate-fade-in overflow-y-auto">
                    <Outlet />
                </main>
            </div>

            {/* Mobile Bottom Navigation Tab-Bar */}
            <BottomNavigation />
        </div>
    );
}

export default DashboardLayout;
