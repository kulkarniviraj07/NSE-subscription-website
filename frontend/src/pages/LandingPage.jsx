import React from "react";
import { useNavigate, Link } from "react-router-dom";
import Button from "../components/ui/Button";

function LandingPage() {
    const navigate = useNavigate();

    // Helper function to handle smooth scroll to pricing section
    const scrollToPricing = (e) => {
        e.preventDefault();
        const element = document.getElementById("pricing-preview");
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div className="min-h-screen bg-[#0C0E14] text-[#E3E5EA] font-sans relative overflow-hidden">
            {/* Ambient Background Grid and Glows */}
            <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
            <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-[#33D097]/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#33D097]/5 rounded-full blur-3xl pointer-events-none" />

            {/* HEADER / NAVBAR */}
            <header className="sticky top-0 z-40 bg-[#0C0E14]/80 backdrop-blur-md border-b border-[#222A38] transition-all duration-200">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#151921] border border-[#222A38] flex items-center justify-center text-[#33D097] shadow-sm">
                            <span className="font-extrabold text-base tracking-wider">PF</span>
                        </div>
                        <span className="font-bold text-lg tracking-tight text-[#E3E5EA]">
                            PureFrames
                        </span>
                    </div>

                    {/* Nav Links */}
                    <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-[#9298A0]">
                        <a href="#features" className="hover:text-[#33D097] transition">Features</a>
                        <a href="#how-it-works" className="hover:text-[#33D097] transition">How It Works</a>
                        <a href="#pricing-preview" className="hover:text-[#33D097] transition">Pricing</a>
                    </nav>

                    {/* Auth Buttons */}
                    <div className="flex items-center gap-3">
                        <Link to="/login" className="text-sm font-semibold text-[#9298A0] hover:text-[#E3E5EA] transition px-3 py-2">
                            Login
                        </Link>
                        <Button onClick={() => navigate("/register")} variant="primary" className="!h-10 text-xs px-4">
                            Start Free
                        </Button>
                    </div>
                </div>
            </header>

            {/* SECTION 1 - HERO SECTION */}
            <section className="relative z-10 max-w-4xl mx-auto px-6 pt-16 pb-12 text-center flex flex-col items-center">
                {/* Active explorers badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#151921] border border-[#222A38] text-xs font-semibold text-[#9298A0] mb-8">
                    <span className="w-2 h-2 bg-[#33D097] rounded-full animate-pulse" />
                    <span className="text-[#33D097]">893</span> people exploring stocks now
                </div>

                <h1 className="text-4xl sm:text-6xl font-black text-[#E3E5EA] tracking-tight leading-tight max-w-3xl">
                    Never Miss Important <span className="text-[#33D097]">Company Announcements.</span>
                </h1>

                <p className="text-[#9298A0] text-sm sm:text-lg mt-6 max-w-2xl leading-relaxed font-medium">
                    Track NSE & BSE companies and receive instant WhatsApp alerts for earnings reports, dividends, board meetings, acquisitions, regulatory filings and more.
                </p>

                {/* Hero CTAs */}
                <div className="mt-8 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                    <Button onClick={() => navigate("/register")} variant="primary" className="px-8 !h-13 text-sm">
                        Start Tracking Free
                    </Button>
                    <Button onClick={scrollToPricing} variant="outline" className="px-8 !h-13 text-sm">
                        View Plans
                    </Button>
                </div>

                {/* Visual Search Bar Mimic matching screenshot layout */}
                <div className="w-full max-w-2xl mt-16 p-4 rounded-3xl bg-[#151921]/60 border border-[#222A38] shadow-2xl relative">
                    <div className="relative w-full flex items-center bg-[#0C0E14] border border-[#222A38] rounded-2xl overflow-hidden px-4 py-2">
                        <svg className="w-5 h-5 text-[#6B7280] mr-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input 
                            type="text" 
                            placeholder="Search NSE / BSE companies" 
                            disabled 
                            className="bg-transparent text-sm text-[#E3E5EA] placeholder-[#6B7280] focus:outline-none w-full cursor-pointer"
                            onClick={() => navigate("/register")}
                        />
                        <button 
                            onClick={() => navigate("/register")}
                            className="bg-[#33D097] hover:bg-[#3be6a7] text-[#0C0E14] font-bold text-sm px-6 py-2 rounded-xl transition shrink-0 ml-2"
                        >
                            Go
                        </button>
                    </div>

                    {/* Sub-search badges */}
                    <div className="mt-4 flex flex-wrap justify-center gap-y-2 gap-x-4 text-[11px] text-[#9298A0] font-semibold">
                        <span className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 bg-[#33D097] rounded-full" />
                            12 AI agents working 24x7
                        </span>
                        <span className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 bg-[#33D097] rounded-full" />
                            Free forever
                        </span>
                        <span className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 bg-[#33D097] rounded-full" />
                            All NSE/BSE companies tracked
                        </span>
                        <span className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 bg-[#33D097] rounded-full" />
                            Real-time WhatsApp alerts
                        </span>
                    </div>
                </div>
            </section>

            {/* SECTION 2 - TRUST BAR */}
            <section className="border-y border-[#222A38] bg-[#151921]/30 py-8 relative z-10">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
                        <div className="flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-[#151921]/60 border border-[#222A38]/50 shadow-sm">
                            <span className="text-[#33D097] font-bold text-lg">✓</span>
                            <span className="text-xs sm:text-sm font-semibold text-[#9298A0]">200+ Companies Available</span>
                        </div>
                        <div className="flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-[#151921]/60 border border-[#222A38]/50 shadow-sm">
                            <span className="text-[#33D097] font-bold text-lg">✓</span>
                            <span className="text-xs sm:text-sm font-semibold text-[#9298A0]">WhatsApp Alerts</span>
                        </div>
                        <div className="flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-[#151921]/60 border border-[#222A38]/50 shadow-sm">
                            <span className="text-[#33D097] font-bold text-lg">✓</span>
                            <span className="text-xs sm:text-sm font-semibold text-[#9298A0]">Free Forever Plan</span>
                        </div>
                        <div className="flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-[#151921]/60 border border-[#222A38]/50 shadow-sm">
                            <span className="text-[#33D097] font-bold text-lg">✓</span>
                            <span className="text-xs sm:text-sm font-semibold text-[#9298A0]">NSE & BSE Coverage</span>
                        </div>
                        <div className="flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-[#151921]/60 border border-[#222A38]/50 shadow-sm col-span-2 md:col-span-1">
                            <span className="text-[#33D097] font-bold text-lg">✓</span>
                            <span className="text-xs sm:text-sm font-semibold text-[#9298A0]">Real-Time Monitoring</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 3 - HOW IT WORKS */}
            <section id="how-it-works" className="py-20 max-w-7xl mx-auto px-6 text-center relative z-10">
                <span className="text-xs font-bold text-[#33D097] uppercase tracking-widest bg-[#33D097]/5 px-3 py-1 rounded-full border border-[#33D097]/10">
                    Process Flow
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-[#E3E5EA] mt-4 tracking-tight">
                    How PureFrames Works
                </h2>
                <p className="text-[#9298A0] text-sm sm:text-base mt-2 max-w-md mx-auto">
                    Three simple steps to automate your investment monitoring.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                    {/* Step 1 */}
                    <div className="p-8 bg-[#151921] border border-[#222A38] rounded-3xl hover:scale-[1.02] hover:border-[#33D097]/30 transition duration-300 text-left flex flex-col justify-between min-h-[220px]">
                        <div className="space-y-4">
                            <span className="text-xs font-bold text-[#33D097] uppercase tracking-wider block">
                                Step 01
                            </span>
                            <h3 className="text-xl font-bold text-[#E3E5EA]">
                                Choose Companies
                            </h3>
                            <p className="text-sm text-[#9298A0] leading-relaxed">
                                Select companies from our tracking database.
                            </p>
                        </div>
                    </div>

                    {/* Step 2 */}
                    <div className="p-8 bg-[#151921] border border-[#222A38] rounded-3xl hover:scale-[1.02] hover:border-[#33D097]/30 transition duration-300 text-left flex flex-col justify-between min-h-[220px]">
                        <div className="space-y-4">
                            <span className="text-xs font-bold text-[#33D097] uppercase tracking-wider block">
                                Step 02
                            </span>
                            <h3 className="text-xl font-bold text-[#E3E5EA]">
                                We Monitor Filings
                            </h3>
                            <p className="text-sm text-[#9298A0] leading-relaxed">
                                PureFrames continuously watches corporate disclosures.
                            </p>
                        </div>
                    </div>

                    {/* Step 3 */}
                    <div className="p-8 bg-[#151921] border border-[#222A38] rounded-3xl hover:scale-[1.02] hover:border-[#33D097]/30 transition duration-300 text-left flex flex-col justify-between min-h-[220px]">
                        <div className="space-y-4">
                            <span className="text-xs font-bold text-[#33D097] uppercase tracking-wider block">
                                Step 03
                            </span>
                            <h3 className="text-xl font-bold text-[#E3E5EA]">
                                Get WhatsApp Alerts
                            </h3>
                            <p className="text-sm text-[#9298A0] leading-relaxed">
                                Receive important updates instantly.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 4 - WHY PUREFRAMES */}
            <section id="features" className="py-20 bg-[#151921]/20 border-y border-[#222A38] relative z-10">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <span className="text-xs font-bold text-[#33D097] uppercase tracking-widest bg-[#33D097]/5 px-3 py-1 rounded-full border border-[#33D097]/10">
                        Benefits
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-black text-[#E3E5EA] mt-4 tracking-tight">
                        Why Investors Use PureFrames
                    </h2>
                    <p className="text-[#9298A0] text-sm sm:text-base mt-2 max-w-md mx-auto">
                        A robust, lightweight alerts terminal for modern market participants.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 text-left">
                        {/* 1 */}
                        <div className="p-6 bg-[#151921] border border-[#222A38] rounded-2xl hover:border-[#33D097]/20 transition">
                            <h4 className="font-bold text-[#E3E5EA] text-base mb-2">Never miss announcements</h4>
                            <p className="text-xs text-[#9298A0] leading-relaxed">Continuous feeds covering corporate announcements, quarterly earnings, and regulatory changes.</p>
                        </div>
                        {/* 2 */}
                        <div className="p-6 bg-[#151921] border border-[#222A38] rounded-2xl hover:border-[#33D097]/20 transition">
                            <h4 className="font-bold text-[#E3E5EA] text-base mb-2">No manual checking</h4>
                            <p className="text-xs text-[#9298A0] leading-relaxed">Save hours scrolling through BSE and NSE filing logs. Get the critical content pushed automatically.</p>
                        </div>
                        {/* 3 */}
                        <div className="p-6 bg-[#151921] border border-[#222A38] rounded-2xl hover:border-[#33D097]/20 transition">
                            <h4 className="font-bold text-[#E3E5EA] text-base mb-2">WhatsApp notifications</h4>
                            <p className="text-xs text-[#9298A0] leading-relaxed">Receive files directly on your messaging app. Tap to read disclosure PDFs on the go.</p>
                        </div>
                        {/* 4 */}
                        <div className="p-6 bg-[#151921] border border-[#222A38] rounded-2xl hover:border-[#33D097]/20 transition">
                            <h4 className="font-bold text-[#E3E5EA] text-base mb-2">Simple setup</h4>
                            <p className="text-xs text-[#9298A0] leading-relaxed">Register using your phone number, authenticate via OTP, and define your watchlist instantly.</p>
                        </div>
                        {/* 5 */}
                        <div className="p-6 bg-[#151921] border border-[#222A38] rounded-2xl hover:border-[#33D097]/20 transition">
                            <h4 className="font-bold text-[#E3E5EA] text-base mb-2">Track multiple companies</h4>
                            <p className="text-xs text-[#9298A0] leading-relaxed">Customize your watchlists based on active subscription limits. Monitor up to 25 firms.</p>
                        </div>
                        {/* 6 */}
                        <div className="p-6 bg-[#151921] border border-[#222A38] rounded-2xl hover:border-[#33D097]/20 transition">
                            <h4 className="font-bold text-[#E3E5EA] text-base mb-2">Fast and lightweight</h4>
                            <p className="text-xs text-[#9298A0] leading-relaxed">Extremely optimized system architecture delivering sub-second search filters and updates.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 5 - PLANS PREVIEW */}
            <section id="pricing-preview" className="py-20 max-w-7xl mx-auto px-6 text-center relative z-10">
                <span className="text-xs font-bold text-[#33D097] uppercase tracking-widest bg-[#33D097]/5 px-3 py-1 rounded-full border border-[#33D097]/10">
                    Pricing
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-[#E3E5EA] mt-4 tracking-tight">
                    Simple Pricing
                </h2>
                <p className="text-[#9298A0] text-sm sm:text-base mt-2 max-w-md mx-auto">
                    Choose the subscription tier that suits your watchlist coverage.
                </p>

                <div className="flex flex-col md:flex-row gap-6 max-w-2xl mx-auto justify-center mt-12 text-left">
                    {/* Free Plan */}
                    <div className="relative p-6 bg-[#151921] rounded-2xl border border-[#222A38] flex flex-col justify-between overflow-hidden shadow-sm flex-1 min-w-[280px]">
                        <div className="space-y-4">
                            <h3 className="text-lg font-bold text-[#E3E5EA] uppercase tracking-wide">
                                FREE
                            </h3>
                            <div className="flex items-baseline gap-1 border-b border-[#222A38] pb-4">
                                <span className="text-4xl font-bold text-[#E3E5EA] tracking-tight">
                                    ₹0
                                </span>
                            </div>
                            <ul className="space-y-3 py-2 text-xs font-semibold text-[#9298A0]">
                                <li className="flex items-center gap-2.5">
                                    <span className="text-[#33D097]">✓</span>
                                    Access all companies
                                </li>
                                <li className="flex items-center gap-2.5">
                                    <span className="text-[#33D097]">✓</span>
                                    Track up to <span className="text-[#E3E5EA] font-bold">5 companies</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Premium Plan */}
                    <div className="relative p-6 bg-[#151921] rounded-2xl border-2 border-[#33D097] shadow-xl shadow-[#33D097]/5 flex flex-col justify-between overflow-hidden flex-1 min-w-[280px]">
                        <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#33D097] text-[#0C0E14] text-xs font-bold px-4 py-1.5 rounded-full tracking-wider uppercase shadow-sm">
                            Most Popular
                        </span>
                        <div className="space-y-4 mt-2">
                            <h3 className="text-lg font-bold text-[#E3E5EA] uppercase tracking-wide">
                                PREMIUM
                            </h3>
                            <div className="flex items-baseline gap-1 border-b border-[#222A38] pb-4">
                                <span className="text-4xl font-bold text-[#E3E5EA] tracking-tight">
                                    ₹119
                                </span>
                                <span className="text-xs text-[#9298A0] font-semibold uppercase">
                                    / month
                                </span>
                            </div>
                            <ul className="space-y-3 py-2 text-xs font-semibold text-[#9298A0]">
                                <li className="flex items-center gap-2.5">
                                    <span className="text-[#33D097]">✓</span>
                                    Access all companies
                                </li>
                                <li className="flex items-center gap-2.5">
                                    <span className="text-[#33D097]">✓</span>
                                    Track up to <span className="text-[#E3E5EA] font-bold">25 companies</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="mt-12">
                    <Button onClick={() => navigate("/register")} variant="primary" className="px-8 !h-12 text-sm mx-auto">
                        Compare Plans
                    </Button>
                </div>
            </section>

            {/* SECTION 6 - FEATURE HIGHLIGHTS */}
            <section className="py-20 bg-[#151921]/20 border-y border-[#222A38] relative z-10">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <span className="text-xs font-bold text-[#33D097] uppercase tracking-widest bg-[#33D097]/5 px-3 py-1 rounded-full border border-[#33D097]/10">
                        Disclosures
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-black text-[#E3E5EA] mt-4 tracking-tight">
                        What We Monitor
                    </h2>
                    <p className="text-[#9298A0] text-sm sm:text-base mt-2 max-w-md mx-auto">
                        Instantly track these key events matching regulatory filings databases.
                    </p>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12 text-left">
                        {[
                            "Quarterly Results",
                            "Dividends",
                            "Board Meetings",
                            "Acquisitions",
                            "Bonus Issues",
                            "Rights Issues",
                            "Regulatory Filings",
                            "Shareholding Updates"
                        ].map((feat, idx) => (
                            <div key={idx} className="p-4 bg-[#151921] border border-[#222A38] rounded-xl flex items-center justify-between">
                                <span className="text-xs font-bold text-[#E3E5EA]">{feat}</span>
                                <span className="w-1.5 h-1.5 bg-[#33D097] rounded-full shrink-0 ml-2" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SECTION 7 - FINAL CTA */}
            <section className="py-24 max-w-5xl mx-auto px-6 text-center relative z-10">
                <div className="bg-gradient-to-r from-[#0C0E14] to-[#151921] border border-[#222A38] rounded-3xl p-10 sm:p-16 flex flex-col items-center">
                    <h2 className="text-3xl sm:text-5xl font-black text-[#E3E5EA] tracking-tight leading-tight">
                        Start Tracking Companies Today
                    </h2>
                    <p className="text-[#9298A0] text-sm sm:text-base mt-4 max-w-lg leading-relaxed font-medium">
                        Create a free account and start monitoring your favorite companies in minutes.
                    </p>

                    <div className="mt-8 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                        <Button onClick={() => navigate("/register")} variant="primary" className="px-8 !h-13 text-sm">
                            Create Free Account
                        </Button>
                        <Link to="/login" className="w-full sm:w-auto">
                            <Button variant="outline" className="px-8 !h-13 text-sm w-full">
                                Login
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="border-t border-[#222A38] bg-[#0C0E14] py-12 relative z-10">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between gap-8 text-left">
                    <div className="max-w-xs space-y-3">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-[#151921] border border-[#222A38] flex items-center justify-center text-[#33D097] shadow-sm">
                                <span className="font-extrabold text-sm tracking-wider">PF</span>
                            </div>
                            <span className="font-bold text-base tracking-tight text-[#E3E5EA]">
                                PureFrames
                            </span>
                        </div>
                        <p className="text-[11px] text-[#6B7280] leading-relaxed">
                            Company Announcement Monitoring Platform
                        </p>
                    </div>

                    {/* Links */}
                    <div className="flex flex-wrap gap-x-12 gap-y-6 text-xs font-semibold text-[#9298A0]">
                        <div className="space-y-3">
                            <span className="block text-[10px] text-[#6B7280] uppercase tracking-wider">Authentication</span>
                            <Link to="/login" className="block hover:text-[#33D097] transition">Login</Link>
                            <Link to="/register" className="block hover:text-[#33D097] transition">Register</Link>
                        </div>
                        <div className="space-y-3">
                            <span className="block text-[10px] text-[#6B7280] uppercase tracking-wider">Plans</span>
                            <Link to="/plans" className="block hover:text-[#33D097] transition">Plans</Link>
                        </div>
                        <div className="space-y-3">
                            <span className="block text-[10px] text-[#6B7280] uppercase tracking-wider">Support</span>
                            <a href="mailto:support@pureframes.com" className="block hover:text-[#33D097] transition">Contact</a>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-6 mt-12 pt-6 border-t border-[#222A38]/50 flex flex-col md:flex-row justify-between gap-4">
                    <p className="text-[10px] text-[#6B7280] leading-relaxed max-w-2xl">
                        PureFrames provides informational alerts only and does not offer investment advice.
                    </p>
                    <p className="text-[10px] text-[#6B7280] shrink-0">
                        &copy; {new Date().getFullYear()} PureFrames. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
}

export default LandingPage;