import React from "react";
import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import useAuth from "../hooks/useAuth";

// Layout
import DashboardLayout from "../components/layout/DashboardLayout";

// Pages
import LandingPage from "../pages/LandingPage";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Dashboard from "../pages/Dashboard/Dashboard";
import CompanySelection from "../pages/Companies/CompanySelection";
import Profile from "../pages/Profile/Profile";
import PlanSelection from "../pages/Subscription/PlanSelection";
import NotFound from "../pages/NotFound/NotFound";

// Legal Pages
import PrivacyPolicy from "../pages/Legal/PrivacyPolicy";
import TermsOfService from "../pages/Legal/TermsOfService";
import Disclaimer from "../pages/Legal/Disclamer";

// Components
import Loader from "../components/common/Loader";

//Main Pages
import Pricing from "../components/mainpages/Pricing";
import Features from "../components/mainpages/Features";
import Coverage from "../components/mainpages/Coverage";
import FAQ from "../components/mainpages/FAQ";
import HowItWorks from "../components/mainpages/HowItWorks";
/**
 * Protected Route
 */
function ProtectedRoute({ children }) {

    const {
        isAuthenticated,
        loading
    } = useAuth();

    if (loading) {
        return <Loader fullScreen />;
    }

    if (!isAuthenticated) {
        return (
            <Navigate
                to="/login"
                replace
            />
        );
    }

    return children;

}

/**
 * Public Route
 */
function PublicRoute({ children }) {

    const {
        isAuthenticated,
        loading
    } = useAuth();

    if (loading) {
        return <Loader fullScreen />;
    }

    if (isAuthenticated) {
        return (
            <Navigate
                to="/dashboard"
                replace
            />
        );
    }

    return children;

}

/**
 * Home Route
 * Logged-in users → Dashboard
 * Logged-out users → Landing Page
 */
function HomeRoute() {

    const {
        isAuthenticated,
        loading
    } = useAuth();

    if (loading) {
        return <Loader fullScreen />;
    }

    return isAuthenticated
        ? (
            <Navigate
                to="/dashboard"
                replace
            />
        )
        : (
            <LandingPage />
        );

}

function AppRoutes() {

    return (
            <Routes>

                {/* HOME */}
                <Route
                    path="/"
                    element={<HomeRoute />}
                />

                {/* PUBLIC ROUTES */}
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

                {/* PROTECTED ROUTES */}
                <Route
                    element={
                        <ProtectedRoute>
                            <DashboardLayout />
                        </ProtectedRoute>
                    }
                >
                    <Route
                        path="/dashboard"
                        element={<Dashboard />}
                    />

                    <Route
                        path="/companies"
                        element={<CompanySelection />}
                    />

                    <Route
                        path="/profile"
                        element={<Profile />}
                    />

                    <Route
                        path="/plans"
                        element={<PlanSelection />}
                    />
                </Route>

                {/* Legal Pages */}
                <Route
                    path="/privacy-policy"
                    element={<PrivacyPolicy />}
                />

                <Route
                    path="/terms-of-service"
                    element={<TermsOfService />}
                />

                <Route
                    path="/disclaimer"
                    element={<Disclaimer />}
                />

                <Route path="/pricing" element={<Pricing />} />
                <Route path="/features" element={<Features />} />
                <Route path="/coverage" element={<Coverage />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/how-it-works" element={<HowItWorks />} />

                {/* 404 */}
                <Route
                    path="*"
                    element={<NotFound />}
                />
            </Routes>
        

    );

}

export default AppRoutes;