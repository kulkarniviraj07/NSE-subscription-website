import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

// Layout
import DashboardLayout from "../components/layout/DashboardLayout";

// Pages
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Dashboard from "../pages/Dashboard/Dashboard";
import CompanySelection from "../pages/Companies/CompanySelection";
import Announcements from "../pages/Announcements/Announcements";
import Profile from "../pages/Profile/Profile";
import PlanSelection from "../pages/Subscription/PlanSelection";
import NotFound from "../pages/NotFound/NotFound";
import Loader from "../components/common/Loader";

/**
 * Route guard that redirects unauthenticated users to `/login`.
 */
function ProtectedRoute({ children }) {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return <Loader fullScreen />;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

/**
 * Route guard that prevents authenticated users from accessing public auth pages.
 */
function PublicRoute({ children }) {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return <Loader fullScreen />;
    }

    if (isAuthenticated) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
}

/**
 * Unified routing structure supporting all core Phase 2 page paths and route guards.
 */
export function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                {/* ROOT Redirect Rules */}
                <Route
                    path="/"
                    element={
                        <Navigate to="/dashboard" replace />
                    }
                />

                {/* PUBLIC ROUTING (Unauthenticated Access Only) */}
                <Route
                    path="/login"
                    element={
                        <PublicRoute>
                            <Login />
                        </PublicRoute>
                    }
                />
                <Route
                    path="/register"
                    element={
                        <PublicRoute>
                            <Register />
                        </PublicRoute>
                    }
                />

                {/* PROTECTED ROUTING (Authenticated Access Only) */}
                <Route
                    element={
                        <ProtectedRoute>
                            <DashboardLayout />
                        </ProtectedRoute>
                    }
                >
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/companies" element={<CompanySelection />} />
                    <Route path="/announcements" element={<Announcements />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/plans" element={<PlanSelection />} />
                </Route>

                {/* CATCH-ALL Route for 404 Pages */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;