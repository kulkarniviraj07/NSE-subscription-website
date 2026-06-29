import React from "react";
import LandingNavbar from "../layout/LandingNavbar";
import Footer from "../layout/Footer";
import { useNavigate } from "react-router-dom";

export default function Coverage() {
    const navigate = useNavigate();

    const coverageItems = [
        { icon: "📊", name: "Quarterly Results" },
        { icon: "💰", name: "Dividends" },
        { icon: "🗓️", name: "Board Meetings" },
        { icon: "🤝", name: "Acquisitions" },
        { icon: "🎁", name: "Bonus Issues" },
        { icon: "📜", name: "Rights Issues" },
        { icon: "⚖️", name: "Regulatory Filings" },
        { icon: "👥", name: "Shareholding Updates" },
        { icon: "📈", name: "Stock Split" },
        { icon: "🏦", name: "Fund Raising" },
        { icon: "💹", name: "Buyback" },
        { icon: "📃", name: "Annual Reports" }
    ];

    return (
        <div className="min-h-screen bg-[#07090F] text-white">

            <LandingNavbar/>

            {/* Hero */}
            <section className="pt-32 pb-24 border-b border-[#1E2535]">
                <div className="max-w-6xl mx-auto px-6 text-center">

                    <span className="text-[#33D097] uppercase tracking-[3px] font-bold text-sm">
                        Coverage
                    </span>

                    <h1 className="text-5xl font-bold mt-5">
                        What We Monitor
                    </h1>

                    <p className="text-[#98A0AE] mt-6 text-lg max-w-3xl mx-auto leading-8">
                        EquityAlerts continuously tracks corporate filings from
                        NSE and BSE and instantly notifies you whenever
                        important announcements are published.
                    </p>

                </div>
            </section>

            {/* Coverage Grid */}
            <section className="py-20">
                <div className="max-w-6xl mx-auto px-6">

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

                        {coverageItems.map((item, index) => (

                            <div
                                key={index}
                                className="bg-[#10141E] border border-[#1E2535] rounded-xl p-6 hover:border-[#33D097] hover:-translate-y-2 transition duration-300"
                            >

                                <div className="text-4xl mb-4">
                                    {item.icon}
                                </div>

                                <h3 className="font-semibold text-lg">
                                    {item.name}
                                </h3>

                            </div>

                        ))}

                    </div>

                </div>
            </section>

            {/* Statistics */}
            <section className="py-20 bg-[#0B0E16] border-y border-[#1E2535]">

                <div className="max-w-6xl mx-auto px-6">

                    <div className="grid md:grid-cols-4 gap-8 text-center">

                        <div>
                            <h2 className="text-5xl font-bold text-[#33D097]">
                                200+
                            </h2>

                            <p className="text-[#98A0AE] mt-2">
                                Listed Companies
                            </p>
                        </div>

                        <div>
                            <h2 className="text-5xl font-bold text-[#33D097]">
                                24×7
                            </h2>

                            <p className="text-[#98A0AE] mt-2">
                                Monitoring
                            </p>
                        </div>

                        <div>
                            <h2 className="text-5xl font-bold text-[#33D097]">
                                &lt;1s
                            </h2>

                            <p className="text-[#98A0AE] mt-2">
                                Alert Delivery
                            </p>
                        </div>

                        <div>
                            <h2 className="text-5xl font-bold text-[#33D097]">
                                99.9%
                            </h2>

                            <p className="text-[#98A0AE] mt-2">
                                Uptime
                            </p>
                        </div>

                    </div>

                </div>

            </section>

            <Footer />

        </div>
    );
}