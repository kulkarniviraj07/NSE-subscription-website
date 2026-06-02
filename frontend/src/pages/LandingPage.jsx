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
            <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#33D097]/5 rounded-full blur-3xl pointer-events-none" />            {/* HEADER / NAVBAR */}
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

            {/* STOCK TICKER STRIP */}
            <div className="bg-[#151921]/90 backdrop-blur-sm border-b border-[#222A38] py-2 overflow-hidden relative z-30 font-mono text-[11px] tracking-wider select-none">
                <div className="animate-marquee flex gap-8 whitespace-nowrap">
                    {[
                        { symbol: "RELIANCE", price: "2,450.80", change: "+2.4%", up: true },
                        { symbol: "TCS", price: "3,892.40", change: "+1.8%", up: true },
                        { symbol: "INFY", price: "1,450.35", change: "-0.7%", up: false },
                        { symbol: "HDFCBANK", price: "1,675.20", change: "+1.1%", up: true },
                        { symbol: "ICICIBANK", price: "1,124.60", change: "+1.5%", up: true },
                        { symbol: "BHARTIARTL", price: "1,220.15", change: "-0.4%", up: false },
                        { symbol: "SBIN", price: "782.40", change: "+2.0%", up: true },
                        { symbol: "LICI", price: "982.10", change: "-1.2%", up: false },
                        { symbol: "ITC", price: "432.80", change: "+0.8%", up: true },
                        { symbol: "KOTAKBANK", price: "1,745.90", change: "-0.5%", up: false }
                    ].map((item, idx) => (
                        <span key={idx} className="flex items-center gap-1.5 px-4 border-r border-[#222A38]/40">
                            <span className="text-[#E3E5EA] font-bold">{item.symbol}</span>
                            <span className="text-[#9298A0]">{item.price}</span>
                            <span className={item.up ? "text-[#33D097] font-bold" : "text-[#EF4444] font-bold"}>
                                {item.up ? "▲" : "▼"} {item.change}
                            </span>
                        </span>
                    ))}
                    {/* Duplicate for infinite marquee scrolling effect */}
                    {[
                        { symbol: "RELIANCE", price: "2,450.80", change: "+2.4%", up: true },
                        { symbol: "TCS", price: "3,892.40", change: "+1.8%", up: true },
                        { symbol: "INFY", price: "1,450.35", change: "-0.7%", up: false },
                        { symbol: "HDFCBANK", price: "1,675.20", change: "+1.1%", up: true },
                        { symbol: "ICICIBANK", price: "1,124.60", change: "+1.5%", up: true },
                        { symbol: "BHARTIARTL", price: "1,220.15", change: "-0.4%", up: false },
                        { symbol: "SBIN", price: "782.40", change: "+2.0%", up: true },
                        { symbol: "LICI", price: "982.10", change: "-1.2%", up: false },
                        { symbol: "ITC", price: "432.80", change: "+0.8%", up: true },
                        { symbol: "KOTAKBANK", price: "1,745.90", change: "-0.5%", up: false }
                    ].map((item, idx) => (
                        <span key={`dup-${idx}`} className="flex items-center gap-1.5 px-4 border-r border-[#222A38]/40">
                            <span className="text-[#E3E5EA] font-bold">{item.symbol}</span>
                            <span className="text-[#9298A0]">{item.price}</span>
                            <span className={item.up ? "text-[#33D097] font-bold" : "text-[#EF4444] font-bold"}>
                                {item.up ? "▲" : "▼"} {item.change}
                            </span>
                        </span>
                    ))}
                </div>
            </div>

            {/* SECTION 1 - HERO SECTION */}
            <section className="relative z-10 max-w-5xl mx-auto px-6 pt-16 pb-16 text-center flex flex-col items-center">
                {/* Active explorers badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#151921] border border-[#222A38] text-xs font-semibold text-[#9298A0] mb-8">
                    <span className="w-2 h-2 bg-[#33D097] rounded-full animate-pulse" />
                    <span className="text-[#33D097]">893</span> analysts tracking announcements live
                </div>

                <h1 className="text-4xl sm:text-6xl font-black text-[#E3E5EA] tracking-tight leading-tight max-w-4xl">
                    Never Miss Important <span className="text-[#33D097]">Company Announcements.</span>
                </h1>

                <p className="text-[#9298A0] text-sm sm:text-lg mt-6 max-w-3xl leading-relaxed font-medium">
                    Track NSE & BSE companies and receive instant WhatsApp alerts for earnings reports, dividends, board meetings, acquisitions, regulatory filings and corporate disclosures.
                </p>

                {/* Hero CTAs */}
                <div className="mt-8 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                    <Button onClick={() => navigate("/register")} variant="primary" className="px-8 !h-13 text-sm font-bold tracking-wide">
                        Start Tracking Free
                    </Button>
                    <Button onClick={scrollToPricing} variant="outline" className="px-8 !h-13 text-sm font-bold tracking-wide">
                        View Plans
                    </Button>
                </div>

                {/* Live Market Style Terminal Widget mockup */}
                <div className="w-full mt-16 p-1.5 rounded-[28px] bg-[#151921] border border-[#222A38] shadow-2xl relative z-10 text-left overflow-hidden">
                    {/* Top bar */}
                    <div className="flex items-center justify-between px-6 py-4 border-b border-[#222A38] bg-[#0C0E14]/40">
                        <div className="flex items-center gap-3">
                            <div className="w-2.5 h-2.5 bg-[#33D097] rounded-full animate-pulse" />
                            <span className="font-mono text-xs font-bold text-[#E3E5EA]">TICKER: RELIANCE (NSE)</span>
                            <span className="text-[10px] bg-[#33D097]/10 text-[#33D097] border border-[#33D097]/20 px-2 py-0.5 rounded font-bold">LIVE METRICS</span>
                        </div>
                        <div className="flex items-center gap-4 text-xs font-mono">
                            <span className="text-[#9298A0]">LTP: <strong className="text-[#E3E5EA]">2,450.80</strong></span>
                            <span className="text-[#33D097]">CHG: <strong>+58.30 (+2.44%)</strong></span>
                        </div>
                    </div>
                    {/* Main area: Chart on left, Order depth on right */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-[#222A38]">
                        <div className="md:col-span-3 p-6 bg-[#151921] min-h-[300px] relative">
                            {/* Inner chart grid lines */}
                            <div className="absolute inset-0 bg-market-grid opacity-20 pointer-events-none" />
                            {/* Candlestick illustration */}
                            <svg className="w-full h-full min-h-[250px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 240">
                                {/* Price lines */}
                                <line x1="0" y1="60" x2="600" y2="60" stroke="#1A2230" strokeWidth="1" strokeDasharray="4,4" />
                                <line x1="0" y1="120" x2="600" y2="120" stroke="#1A2230" strokeWidth="1" strokeDasharray="4,4" />
                                <line x1="0" y1="180" x2="600" y2="180" stroke="#1A2230" strokeWidth="1" strokeDasharray="4,4" />
                                
                                {/* Dotted trendline */}
                                <path d="M50 180 Q 150 120 280 160 T 480 80 T 580 50" fill="none" stroke="#33D097" strokeWidth="2" strokeDasharray="3,3" />

                                {/* Candlesticks */}
                                <g fill="#33D097" stroke="#33D097" strokeWidth="1.5">
                                    <line x1="80" y1="160" x2="80" y2="210" />
                                    <rect x="76" y="170" width="8" height="30" />
                                    
                                    <line x1="160" y1="110" x2="160" y2="170" />
                                    <rect x="156" y="125" width="8" height="35" />

                                    <line x1="320" y1="120" x2="320" y2="180" />
                                    <rect x="316" y="130" width="8" height="35" />

                                    <line x1="400" y1="90" x2="400" y2="150" />
                                    <rect x="396" y="100" width="8" height="35" />

                                    <line x1="480" y1="60" x2="480" y2="120" />
                                    <rect x="476" y="70" width="8" height="35" />

                                    <line x1="560" y1="40" x2="560" y2="90" />
                                    <rect x="556" y="45" width="8" height="35" />
                                </g>
                                <g fill="#EF4444" stroke="#EF4444" strokeWidth="1.5">
                                    <line x1="120" y1="150" x2="120" y2="200" />
                                    <rect x="116" y="160" width="8" height="30" />

                                    <line x1="200" y1="140" x2="200" y2="200" />
                                    <rect x="196" y="150" width="8" height="35" />

                                    <line x1="240" y1="130" x2="240" y2="180" />
                                    <rect x="236" y="145" width="8" height="25" />

                                    <line x1="280" y1="150" x2="280" y2="210" />
                                    <rect x="276" y="165" width="8" height="35" />

                                    <line x1="360" y1="100" x2="360" y2="160" />
                                    <rect x="356" y="115" width="8" height="30" />

                                    <line x1="440" y1="70" x2="440" y2="130" />
                                    <rect x="436" y="90" width="8" height="25" />

                                    <line x1="520" y1="50" x2="520" y2="110" />
                                    <rect x="516" y="65" width="8" height="30" />
                                </g>
                            </svg>
                        </div>
                        {/* Order Depth Sidebar */}
                        <div className="p-4 bg-[#151921] flex flex-col justify-between text-xs font-mono">
                            <div>
                                <span className="block text-[10px] text-[#6B7280] font-bold uppercase tracking-wider mb-3">Order Book Depth</span>
                                <div className="space-y-1.5">
                                    {/* Bids (Greens) */}
                                    <div className="flex items-center justify-between text-[#33D097]">
                                        <span>2,450.70</span>
                                        <span>4,510</span>
                                    </div>
                                    <div className="flex items-center justify-between text-[#33D097]">
                                        <span>2,450.65</span>
                                        <span>12,850</span>
                                    </div>
                                    <div className="flex items-center justify-between text-[#33D097]">
                                        <span>2,450.60</span>
                                        <span>15,310</span>
                                    </div>
                                    {/* Divider */}
                                    <div className="border-t border-[#222A38] my-1" />
                                    {/* Asks (Reds) */}
                                    <div className="flex items-center justify-between text-[#EF4444]">
                                        <span>2,450.80</span>
                                        <span>8,150</span>
                                    </div>
                                    <div className="flex items-center justify-between text-[#EF4444]">
                                        <span>2,450.85</span>
                                        <span>6,320</span>
                                    </div>
                                    <div className="flex items-center justify-between text-[#EF4444]">
                                        <span>2,450.90</span>
                                        <span>9,430</span>
                                    </div>
                                </div>
                            </div>
                            <div className="pt-4 border-t border-[#222A38] mt-4 flex flex-col gap-1 text-[10px] text-[#6B7280]">
                                <span>SPREAD: 0.10 (0.00%)</span>
                                <span>VOL: 23.89M</span>
                            </div>
                        </div>
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