import React from "react";
import { useNavigate } from "react-router-dom";
import LandingNavbar from "../layout/LandingNavbar";
import Footer from "../layout/Footer";
export default function HowItWorks() {
    const navigate = useNavigate();

    const steps = [
        {
            number: "01",
            title: "Choose Companies",
            description:
                "Search our database of 200+ NSE & BSE listed companies and build your personal watchlist in seconds."
        },
        {
            number: "02",
            title: "We Monitor Filings",
            description:
                "Our engine continuously scans corporate disclosures, quarterly results, dividends, board meetings and regulatory filings 24×7."
        },
        {
            number: "03",
            title: "Get WhatsApp Alerts",
            description:
                "The moment an announcement is published, it is delivered directly to your WhatsApp together with the official filing PDF."
        }
    ];

    return (
        <div className="min-h-screen bg-[#07090F] text-white">

            <LandingNavbar />

            {/* Hero */}

            <section className="pt-32 pb-24 border-b border-[#1E2535]">

                <div className="max-w-6xl mx-auto px-6 text-center">

                    <span className="text-[#33D097] uppercase tracking-[3px] font-bold text-sm">
                        Process Flow
                    </span>

                    <h1 className="text-5xl font-bold mt-5">
                        Three Steps. Zero Manual Checking.
                    </h1>

                    <p className="text-[#98A0AE] mt-6 text-lg leading-8 max-w-3xl mx-auto">
                        Set up your watchlist once and let EquityAlerts monitor
                        NSE and BSE announcements around the clock.
                    </p>

                </div>

            </section>

            {/* Steps */}

            <section className="py-20">

                <div className="max-w-6xl mx-auto px-6">

                    <div className="grid md:grid-cols-3 gap-8">

                        {steps.map((step, index) => (

                            <div
                                key={index}
                                className="relative bg-[#10141E] border border-[#1E2535] rounded-2xl p-8 hover:border-[#33D097] hover:-translate-y-2 transition duration-300"
                            >

                                <div className="w-12 h-12 rounded-xl bg-[#33D097]/10 border border-[#33D097]/20 flex items-center justify-center text-[#33D097] font-bold mb-6">
                                    {step.number}
                                </div>

                                <h3 className="text-2xl font-bold mb-4">
                                    {step.title}
                                </h3>

                                <p className="text-[#98A0AE] leading-7">
                                    {step.description}
                                </p>

                                {index !== 2 && (
                                    <div className="hidden md:block absolute top-1/2 -right-5 text-[#33D097] text-3xl">
                                        →
                                    </div>
                                )}

                            </div>

                        ))}

                    </div>

                </div>

            </section>

            {/* Benefits */}

            <section className="py-20 bg-[#0B0E16] border-y border-[#1E2535]">

                <div className="max-w-6xl mx-auto px-6">

                    <h2 className="text-4xl font-bold text-center mb-16">
                        What Happens Behind the Scenes?
                    </h2>

                    <div className="grid md:grid-cols-2 gap-10">

                        <div className="bg-[#10141E] border border-[#1E2535] rounded-2xl p-8">

                            <h3 className="text-2xl font-bold mb-5 text-[#33D097]">
                                Continuous Monitoring
                            </h3>

                            <p className="text-[#98A0AE] leading-8">
                                Our servers continuously monitor corporate
                                announcements published on NSE and BSE,
                                ensuring you receive updates within seconds of
                                publication.
                            </p>

                        </div>

                        <div className="bg-[#10141E] border border-[#1E2535] rounded-2xl p-8">

                            <h3 className="text-2xl font-bold mb-5 text-[#33D097]">
                                Instant Notifications
                            </h3>

                            <p className="text-[#98A0AE] leading-8">
                                Every important filing is instantly processed,
                                categorised and delivered directly to your
                                WhatsApp with a link to the official document.
                            </p>

                        </div>

                    </div>

                </div>

            </section>

            <Footer />

        </div>
    );
}