import React from "react";
import { useNavigate } from "react-router-dom";
import LandingNavbar from "../layout/LandingNavbar";
import Footer from "../layout/Footer";

export default function Features() {
    const navigate = useNavigate();

    const features = [
        {
            title: "Never miss announcements",
            description:
                "Continuous feeds covering corporate announcements, quarterly earnings and regulatory changes.",
            icon: "📢",
        },
        {
            title: "No manual checking",
            description:
                "Save hours scrolling BSE and NSE filing logs. The critical content gets pushed to you automatically.",
            icon: "⏰",
        },
        {
            title: "WhatsApp notifications",
            description:
                "Alerts arrive directly in your messaging app. Tap to read disclosure PDFs on the go.",
            icon: "💬",
        },
        {
            title: "Simple setup",
            description:
                "Register with your phone number, authenticate via OTP, and define your watchlist instantly.",
            icon: "⚡",
        },
        {
            title: "Track multiple companies",
            description:
                "Customise watchlists based on your subscription plan. Monitor up to 25 companies simultaneously.",
            icon: "📈",
        },
        {
            title: "Fast and lightweight",
            description:
                "Optimised architecture delivering sub-second search, filters and live updates.",
            icon: "🚀",
        },
    ];

    return (
        <div className="min-h-screen bg-[#07090F] text-white">

            <LandingNavbar/>

            {/* Hero */}

            <section className="pt-32 pb-24 border-b border-[#1E2535]">

                <div className="max-w-6xl mx-auto px-6 text-center">

                    <span className="text-[#33D097] uppercase tracking-[3px] font-bold text-sm">
                        Features
                    </span>

                    <h1 className="text-5xl font-bold mt-5">
                        Why Investors Choose EquityAlerts
                    </h1>

                    <p className="text-[#98A0AE] text-lg mt-6 max-w-3xl mx-auto leading-8">
                        A powerful, lightweight platform built for modern
                        investors who never want to miss important company
                        announcements.
                    </p>

                </div>

            </section>

            {/* Feature Cards */}

            <section className="py-20">

                <div className="max-w-7xl mx-auto px-6">

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

                        {features.map((feature, index) => (

                            <div
                                key={index}
                                className="bg-[#10141E] border border-[#1E2535] rounded-2xl p-8 hover:border-[#33D097] hover:-translate-y-2 transition duration-300"
                            >

                                <div className="w-14 h-14 rounded-xl bg-[#33D097]/10 flex items-center justify-center text-3xl mb-6">
                                    {feature.icon}
                                </div>

                                <h3 className="text-xl font-bold mb-4">
                                    {feature.title}
                                </h3>

                                <p className="text-[#98A0AE] leading-7">
                                    {feature.description}
                                </p>

                            </div>

                        ))}

                    </div>

                </div>

            </section>

            {/* Statistics */}

            <section className="py-20 bg-[#0B0E16] border-y border-[#1E2535]">

                <div className="max-w-6xl mx-auto px-6">

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">

                        <div>
                            <h2 className="text-5xl font-bold text-[#33D097]">
                                24×7
                            </h2>
                            <p className="text-[#98A0AE] mt-3">
                                Monitoring
                            </p>
                        </div>

                        <div>
                            <h2 className="text-5xl font-bold text-[#33D097]">
                                &lt;1 sec
                            </h2>
                            <p className="text-[#98A0AE] mt-3">
                                Alert Delivery
                            </p>
                        </div>

                        <div>
                            <h2 className="text-5xl font-bold text-[#33D097]">
                                200+
                            </h2>
                            <p className="text-[#98A0AE] mt-3">
                                Companies Covered
                            </p>
                        </div>

                        <div>
                            <h2 className="text-5xl font-bold text-[#33D097]">
                                99.9%
                            </h2>
                            <p className="text-[#98A0AE] mt-3">
                                Service Uptime
                            </p>
                        </div>

                    </div>

                </div>

            </section>


            <Footer />

        </div>
    );
}