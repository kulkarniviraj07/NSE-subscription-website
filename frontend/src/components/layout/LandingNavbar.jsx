import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function LandingNavbar() {
    const navigate = useNavigate();
    const location = useLocation();

    const navLinks = [
        {
            name: "Pricing",
            path: "/pricing",
        },
        {
            name: "Features",
            path: "/features",
        },
        {
            name: "Coverage",
            path: "/coverage",
        },
        {
            name: "How It Works",
            path: "/how-it-works",
        },
        {
            name: "FAQ",
            path: "/faq",
        },
    ];

    return (
        <header className="sticky top-0 z-50 bg-[#07090F]/95 backdrop-blur-xl border-b border-[#1E2535]">
            <div className="max-w-[1280px] mx-auto px-6 h-[74px] flex items-center justify-between">

                {/* Logo */}

                <Link
                    to="/"
                    className="flex items-center gap-3 shrink-0"
                >
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-[#33D097] to-[#38BDF8] flex items-center justify-center shadow-[0_0_30px_rgba(51,208,151,0.35)]">
                        <svg
                            className="w-6 h-6 text-[#04130C]"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4 16l5-6 4 4 7-9"
                            />
                        </svg>
                    </div>

                    <span className="text-3xl font-bold text-white">
                        EquityAlerts
                    </span>
                </Link>

                {/* Navigation */}

                <nav className="hidden lg:flex items-center gap-10">

                    {navLinks.map((item) => (

                        <Link
                            key={item.path}
                            to={item.path}
                            className={`relative font-semibold transition duration-300 ${
                                location.pathname === item.path
                                    ? "text-white"
                                    : "text-[#98A0AE] hover:text-white"
                            }`}
                        >
                            {item.name}

                            <span
                                className={`absolute left-0 -bottom-2 h-[2px] rounded-full bg-[#33D097] transition-all duration-300 ${
                                    location.pathname === item.path
                                        ? "w-full"
                                        : "w-0 group-hover:w-full"
                                }`}
                            />
                        </Link>

                    ))}

                </nav>

                {/* Right Side */}

                <div className="flex items-center gap-5">

                    <Link to="/login"className="px-6 py-2.5 rounded-full bg-[#1E2635] border border-[#2E3A50] text-white font-bold text-sm hover:bg-[#2A3446] hover:border-[#3DD9A4] transition-all duration-300 shadow-md" >
                    Log In
                    </Link> 

                </div>

            </div>
        </header>
    );
}