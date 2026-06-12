import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";

// Premium animated counter component using IntersectionObserver and RequestAnimationFrame
function AnimatedCounter({ end, duration = 1200 }) {
    const [count, setCount] = useState(0);
    const countRef = useRef(null);

    useEffect(() => {
        let observer;
        let animationFrameId;

        if (countRef.current) {
            observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            let startTimestamp = null;
                            const step = (timestamp) => {
                                if (!startTimestamp) startTimestamp = timestamp;
                                const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                                // Ease out cubic formula
                                const easedProgress = 1 - Math.pow(1 - progress, 3);
                                setCount(Math.round(easedProgress * end));
                                if (progress < 1) {
                                    animationFrameId = requestAnimationFrame(step);
                                }
                            };
                            animationFrameId = requestAnimationFrame(step);
                            observer.unobserve(entry.target);
                        }
                    });
                },
                { threshold: 0.5 }
            );
            observer.observe(countRef.current);
        }

        return () => {
            if (observer) observer.disconnect();
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
        };
    }, [end, duration]);

    return <span ref={countRef}>{count}</span>;
}

function LandingPage() {
    const navigate = useNavigate();

    // Setup scroll reveal animation hook
    useEffect(() => {
        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("in");
                        io.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12 }
        );

        const els = document.querySelectorAll(".reveal");
        els.forEach((el) => io.observe(el));

        return () => {
            els.forEach((el) => io.unobserve(el));
            io.disconnect();
        };
    }, []);

    return (
        <div className="min-h-screen bg-[#07090F] text-[#EDF0F4] font-sans relative overflow-x-hidden antialiased selection:bg-[#33D097]/30">
            {/* Aurora Background and Grid */}
            <div className="aurora-glow fixed inset-0 z-0 pointer-events-none" />
            <div className="bg-grid-pattern fixed inset-0 z-0 pointer-events-none" />

            {/* TICKER */}
            <div className="relative z-10 bg-[#0B0E16]/90 border-b border-[#1E2535] overflow-hidden py-2 font-mono text-[11px]">
                <div className="animate-marquee flex gap-0 whitespace-nowrap">
                    {[...Array(2)].map((_, rIdx) => (
                        <React.Fragment key={rIdx}>
                            {[
                                { symbol: "RELIANCE", change: "1.24%", up: true },
                                { symbol: "TCS", change: "0.42%", up: false },
                                { symbol: "INFY", change: "0.87%", up: true },
                                { symbol: "HDFCBANK", change: "0.31%", up: true },
                                { symbol: "ICICIBANK", change: "0.18%", up: false },
                                { symbol: "BHARTIARTL", change: "2.05%", up: true },
                                { symbol: "SBIN", change: "0.66%", up: true },
                                { symbol: "LICI", change: "0.74%", up: false },
                                { symbol: "ITC", change: "0.12%", up: true },
                                { symbol: "KOTAKBANK", change: "1.48%", up: true }
                            ].map((item, idx) => (
                                <span key={`${rIdx}-${idx}`} className="inline-flex items-center gap-[7px] px-[22px] border-r border-[#1E2535]/60">
                                    <b className="text-[#EDF0F4] font-bold tracking-[0.5px]">{item.symbol}</b>
                                    <span className={item.up ? "text-[#33D097]" : "text-[#F87171]"}>
                                        {item.up ? "▲" : "▼"} {item.change}
                                    </span>
                                </span>
                            ))}
                        </React.Fragment>
                    ))}
                </div>
            </div>

            {/* NAV */}
            <nav className="sticky top-0 z-50 bg-[#07090F]/72 backdrop-blur-[18px] border-b border-[#1E2535]/70">
                <div className="max-w-[1180px] mx-auto px-6 h-[68px] flex items-center justify-between">
                    <div className="flex items-center gap-[11px]">
                        <div className="w-[38px] h-[38px] rounded-[11px] bg-brand-grad flex items-center justify-center shadow-[0_4px_24px_rgba(51,208,151,0.35)]">
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                                <path d="M3 17l5-6 4 4 6-8 3 3" stroke="#04130C" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                        <span className="font-display font-bold text-[18px] tracking-[-0.3px] text-[#EDF0F4]">
                            EquityAlerts
                        </span>
                    </div>

                    <div className="hidden md:flex gap-[34px] text-[13.5px] font-semibold text-[#98A0AE]">
                        <a href="#how" className="hover:text-[#EDF0F4] transition duration-200 relative group py-1">
                            How It Works
                            <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-brand-grad rounded-[2px] transition-all duration-250 group-hover:w-full" />
                        </a>
                        <a href="#features" className="hover:text-[#EDF0F4] transition duration-200 relative group py-1">
                            Features
                            <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-brand-grad rounded-[2px] transition-all duration-250 group-hover:w-full" />
                        </a>
                        <a href="#monitor" className="hover:text-[#EDF0F4] transition duration-200 relative group py-1">
                            Coverage
                            <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-brand-grad rounded-[2px] transition-all duration-250 group-hover:w-full" />
                        </a>
                        <a href="#pricing" className="hover:text-[#EDF0F4] transition duration-200 relative group py-1">
                            Pricing
                            <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-brand-grad rounded-[2px] transition-all duration-250 group-hover:w-full" />
                        </a>
                        <a href="#faq" className="hover:text-[#EDF0F4] transition duration-200 relative group py-1">
                            FAQ
                            <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-brand-grad rounded-[2px] transition-all duration-250 group-hover:w-full" />
                        </a>
                    </div>

                    <div className="flex items-center gap-[14px]">
                        <Link to="/login" className="text-[13.5px] font-semibold text-[#98A0AE] hover:text-[#EDF0F4] transition duration-200">
                            Login
                        </Link>
                        <button
                            onClick={() => navigate("/register")}
                            className="inline-flex items-center justify-center gap-2 font-sans font-bold text-[13.5px] rounded-[12px] px-[22px] h-[44px] cursor-pointer bg-brand-grad text-[#04130C] shadow-[0_6px_28px_rgba(51,208,151,0.32)] hover:shadow-[0_10px_36px_rgba(51,208,151,0.45)] hover:-translate-y-[2px] active:scale-[0.97] transition-all duration-180"
                        >
                            Start Free →
                        </button>
                    </div>
                </div>
            </nav>

            {/* HERO */}
            <header className="max-w-[1180px] mx-auto px-6 relative z-10 pt-[84px] pb-10 grid grid-cols-1 lg:grid-cols-[1.12fr_0.88fr] gap-[56px] items-center text-center lg:text-left">
                <div>
                    <span className="inline-flex items-center gap-2 bg-[#33D097]/[0.07] border border-[#33D097]/22 text-[#33D097] text-xs font-bold px-[14px] py-[7px] rounded-full tracking-[0.3px]">
                        <span className="w-[7px] h-[7px] rounded-full bg-[#33D097] pulse-dot" />
                        893 analysts tracking announcements live
                    </span>

                    <h1 className="font-display text-[38px] md:text-[60px] leading-[1.06] tracking-[-1.8px] font-bold mt-[26px] mb-[22px] text-[#EDF0F4]">
                        Never miss a <span className="grad-text">company announcement</span> again.
                    </h1>

                    <p className="text-[#98A0AE] text-[16.5px] leading-[1.7] max-w-[520px] mx-auto lg:mx-0 font-medium">
                        Track NSE &amp; BSE companies and get instant WhatsApp alerts for earnings, dividends, board meetings, acquisitions and regulatory filings — the moment they're published.
                    </p>

                    <div className="flex gap-[14px] mt-[34px] flex-wrap justify-center lg:justify-start">
                        <button
                            onClick={() => navigate("/register")}
                            className="inline-flex items-center justify-center gap-2 font-sans font-bold text-[14.5px] rounded-[14px] px-[30px] h-[52px] cursor-pointer bg-brand-grad text-[#04130C] shadow-[0_6px_28px_rgba(51,208,151,0.32)] hover:shadow-[0_10px_36px_rgba(51,208,151,0.45)] hover:-translate-y-[2px] active:scale-[0.97] transition-all duration-180"
                        >
                            Start Tracking Free
                        </button>
                        <a
                            href="#pricing"
                            className="inline-flex items-center justify-center gap-2 font-sans font-bold text-[14.5px] rounded-[14px] px-[30px] h-[52px] cursor-pointer bg-transparent text-[#EDF0F4] border border-[#1E2535] hover:border-[#33D097] hover:text-[#33D097] hover:-translate-y-[2px] active:scale-[0.97] transition-all duration-180"
                        >
                            View Plans
                        </a>
                    </div>

                    <div className="flex gap-[44px] mt-[46px] pt-[30px] border-t border-[#1E2535] justify-center lg:justify-start">
                        <div className="text-center lg:text-left">
                            <div className="font-display text-[30px] font-bold tracking-[-1px] text-[#EDF0F4]">
                                <span className="text-[#33D097]"><AnimatedCounter end={200} /></span>+
                            </div>
                            <div className="text-[12px] text-[#646E7E] font-semibold mt-1 tracking-[0.3px] uppercase">Companies</div>
                        </div>
                        <div className="text-center lg:text-left">
                            <div className="font-display text-[30px] font-bold tracking-[-1px] text-[#EDF0F4]">
                                <span className="text-[#33D097]">&lt;1</span>s
                            </div>
                            <div className="text-[12px] text-[#646E7E] font-semibold mt-1 tracking-[0.3px] uppercase">Alert Latency</div>
                        </div>
                        <div className="text-center lg:text-left">
                            <div className="font-display text-[30px] font-bold tracking-[-1px] text-[#EDF0F4]">
                                <span className="text-[#33D097]"><AnimatedCounter end={24} /></span>/7
                            </div>
                            <div className="text-[12px] text-[#646E7E] font-semibold mt-1 tracking-[0.3px] uppercase">Monitoring</div>
                        </div>
                        <div className="text-center lg:text-left">
                            <div className="font-display text-[30px] font-bold tracking-[-1px] text-[#EDF0F4]">
                                <span className="text-[#33D097]">₹0</span>
                            </div>
                            <div className="text-[12px] text-[#646E7E] font-semibold mt-1 tracking-[0.3px] uppercase">To Start</div>
                        </div>
                    </div>
                </div>

                <div className="relative flex justify-center">
                    <div className="absolute bg-[#10141E]/92 backdrop-blur-[10px] border border-[#1E2535] rounded-[14px] px-4 py-3 z-[3] shadow-[0_16px_50px_rgba(0,0,0,0.5)] top-[46px] left-0 lg:-left-[30px] float-card-1 text-left">
                        <div className="text-[9.5px] font-black text-[#646E7E] tracking-[1px] uppercase">NSE Feed</div>
                        <div className="font-display text-[17px] font-bold mt-[3px] text-[#33D097]">● CONNECTED</div>
                    </div>
                    <div className="absolute bg-[#10141E]/92 backdrop-blur-[10px] border border-[#1E2535] rounded-[14px] px-4 py-3 z-[3] shadow-[0_16px_50px_rgba(0,0,0,0.5)] bottom-[70px] right-0 lg:-right-[26px] float-card-2 text-left">
                        <div className="text-[9.5px] font-black text-[#646E7E] tracking-[1px] uppercase">Alerts today</div>
                        <div className="font-display text-[17px] font-bold mt-[3px] text-[#33D097]">+1,284</div>
                    </div>

                    <div className="w-[300px] rounded-[38px] bg-[#0D1119] border border-[#232C3F] shadow-[0_40px_90px_rgba(0,0,0,0.6),0_0_80px_rgba(51,208,151,0.07)] p-3 relative z-[2] phone-float text-left">
                        <div className="rounded-[28px] bg-[#0A0E0B] overflow-hidden h-[540px] flex flex-col">
                            <div className="bg-[#15211B] px-4 py-3.5 flex items-center gap-[11px] border-b border-[#33D097]/10">
                                <div className="w-9 h-9 rounded-full bg-brand-grad flex items-center justify-center font-black text-[13px] text-[#04130C]">EA</div>
                                <div>
                                    <div className="text-[13.5px] font-bold text-[#EDF0F4]">EquityAlerts</div>
                                    <div className="text-[10.5px] text-[#33D097]">● online</div>
                                </div>
                            </div>
                            <div 
                                className="flex-1 px-3 py-3.5 flex flex-col gap-[11px] overflow-hidden"
                                style={{
                                    backgroundImage: "radial-gradient(rgba(51, 208, 151, 0.04) 1px, transparent 1px)",
                                    backgroundSize: "22px 22px"
                                }}
                            >
                                <div className="wa-msg bg-[#121E17] border border-[#33D097]/12 rounded-[4px_14px_14px_14px] px-[13px] py-[11px] max-w-[94%]">
                                    <span className="inline-block text-[9px] font-black tracking-[0.8px] px-2 py-[3px] rounded-[5px] mb-[7px] uppercase bg-[#33D097]/14 text-[#33D097]">
                                        Earnings
                                    </span>
                                    <b className="text-[12.5px] block mb-[3px] text-[#EDF0F4]">RELIANCE — Q4 Results Out</b>
                                    <span className="text-[11px] text-[#98A0AE] leading-[1.5] block">
                                        Consolidated net profit ₹18,951 Cr. Full filing PDF attached.
                                    </span>
                                    <div className="text-[9px] text-[#646E7E] text-right mt-[6px]">09:42 ✓✓</div>
                                </div>
                                <div className="wa-msg bg-[#121E17] border border-[#33D097]/12 rounded-[4px_14px_14px_14px] px-[13px] py-[11px] max-w-[94%]">
                                    <span className="inline-block text-[9px] font-black tracking-[0.8px] px-2 py-[3px] rounded-[5px] mb-[7px] uppercase bg-[#38BDF8]/14 text-[#38BDF8]">
                                        Dividend
                                    </span>
                                    <b className="text-[12.5px] block mb-[3px] text-[#EDF0F4]">TCS — Dividend Declared</b>
                                    <span className="text-[11px] text-[#98A0AE] leading-[1.5] block">
                                        Interim dividend of ₹10/share. Record date: 16 Jun 2026.
                                    </span>
                                    <div className="text-[9px] text-[#646E7E] text-right mt-[6px]">10:15 ✓✓</div>
                                </div>
                                <div className="wa-msg bg-[#121E17] border border-[#33D097]/12 rounded-[4px_14px_14px_14px] px-[13px] py-[11px] max-w-[94%]">
                                    <span className="inline-block text-[9px] font-black tracking-[0.8px] px-2 py-[3px] rounded-[5px] mb-[7px] uppercase bg-[#FBBF24]/14 text-[#FBBF24]">
                                        Board Meeting
                                    </span>
                                    <b className="text-[12.5px] block mb-[3px] text-[#EDF0F4]">HDFCBANK — Board Meeting</b>
                                    <span className="text-[11px] text-[#98A0AE] leading-[1.5] block">
                                        Board meeting scheduled 19 Jun to consider fund raising.
                                    </span>
                                    <div className="text-[9px] text-[#646E7E] text-right mt-[6px]">11:03 ✓✓</div>
                                </div>
                                <div className="wa-msg bg-[#121E17] border border-[#33D097]/12 rounded-[4px_14px_14px_14px] px-[13px] py-[11px] max-w-[94%]">
                                    <span className="inline-block text-[9px] font-black tracking-[0.8px] px-2 py-[3px] rounded-[5px] mb-[7px] uppercase bg-[#F87171]/14 text-[#F87171]">
                                        Acquisition
                                    </span>
                                    <b className="text-[12.5px] block mb-[3px] text-[#EDF0F4]">INFY — Acquisition Update</b>
                                    <span className="text-[11px] text-[#98A0AE] leading-[1.5] block">
                                        Completes acquisition of EU-based consulting firm.
                                    </span>
                                    <div className="text-[9px] text-[#646E7E] text-right mt-[6px]">11:40 ✓✓</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* TRUST STRIP */}
            <div className="relative z-10 border-y border-[#1E2535] bg-[#0B0E16]/50 py-[22px] mt-[60px]">
                <div className="max-w-[1180px] mx-auto px-6 flex justify-between gap-[18px] flex-wrap">
                    {[
                        "200+ Companies",
                        "WhatsApp Alerts",
                        "Free Forever Plan",
                        "NSE & BSE Coverage",
                        "Real-Time Monitoring"
                    ].map((text, idx) => (
                        <div key={idx} className="flex items-center gap-[9px] text-[13px] font-semibold text-[#98A0AE]">
                            <svg className="w-[17px] h-[17px] shrink-0" viewBox="0 0 24 24" fill="none">
                                <circle cx="12" cy="12" r="10" stroke="#33D097" strokeWidth="2"/>
                                <path d="M8 12l3 3 5-6" stroke="#33D097" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            {text}
                        </div>
                    ))}
                </div>
            </div>

            {/* HOW IT WORKS */}
            <section id="how" className="relative z-10 py-24">
                <div className="max-w-[1180px] mx-auto px-6">
                    <div className="text-center max-w-[620px] mx-auto mb-[60px] reveal">
                        <span className="inline-block text-[11.5px] font-black tracking-[2.2px] uppercase text-[#33D097] mb-4">Process Flow</span>
                        <h2 className="font-display text-[28px] md:text-[42px] font-bold tracking-[-1.2px] leading-[1.12] text-[#EDF0F4]">Three steps. Zero manual checking.</h2>
                        <p className="text-[#98A0AE] text-[15.5px] mt-4 leading-[1.65]">Set up once and let EquityAlerts watch the exchanges for you, around the clock.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-[22px] relative">
                        <div className="bg-[#10141E] border border-[#1E2535] rounded-[22px] px-[30px] py-[34px] relative hover:-translate-y-[6px] hover:border-[#33D097]/18 hover:shadow-[0_24px_60px_rgba(0,0,0,0.45)] transition-all duration-300 reveal">
                            <div className="font-display text-[13px] font-bold text-[#33D097] bg-[#33D097]/8 border border-[#33D097]/20 w-11 h-11 rounded-[13px] flex items-center justify-center mb-[22px]">01</div>
                            <h3 className="font-display text-[19px] font-bold tracking-[-0.4px] mb-2.5 text-[#EDF0F4]">Choose Companies</h3>
                            <p className="text-[#98A0AE] text-[13.5px] leading-[1.65]">Search our database of 200+ NSE &amp; BSE listed companies and build your personal watchlist in seconds.</p>
                            <span className="hidden md:block absolute top-1/2 right-[-19px] -translate-y-1/2 z-[2] text-[#33D097] opacity-60 text-[18px]">→</span>
                        </div>
                        <div className="bg-[#10141E] border border-[#1E2535] rounded-[22px] px-[30px] py-[34px] relative hover:-translate-y-[6px] hover:border-[#33D097]/18 hover:shadow-[0_24px_60px_rgba(0,0,0,0.45)] transition-all duration-300 reveal transition-delay-[0.1s]">
                            <div className="font-display text-[13px] font-bold text-[#33D097] bg-[#33D097]/8 border border-[#33D097]/20 w-11 h-11 rounded-[13px] flex items-center justify-center mb-[22px]">02</div>
                            <h3 className="font-display text-[19px] font-bold tracking-[-0.4px] mb-2.5 text-[#EDF0F4]">We Monitor Filings</h3>
                            <p className="text-[#98A0AE] text-[13.5px] leading-[1.65]">Our engine continuously scans corporate disclosures, results, dividends and regulatory filings — 24/7.</p>
                            <span className="hidden md:block absolute top-1/2 right-[-19px] -translate-y-1/2 z-[2] text-[#33D097] opacity-60 text-[18px]">→</span>
                        </div>
                        <div className="bg-[#10141E] border border-[#1E2535] rounded-[22px] px-[30px] py-[34px] relative hover:-translate-y-[6px] hover:border-[#33D097]/18 hover:shadow-[0_24px_60px_rgba(0,0,0,0.45)] transition-all duration-300 reveal transition-delay-[0.2s]">
                            <div className="font-display text-[13px] font-bold text-[#33D097] bg-[#33D097]/8 border border-[#33D097]/20 w-11 h-11 rounded-[13px] flex items-center justify-center mb-[22px]">03</div>
                            <h3 className="font-display text-[19px] font-bold tracking-[-0.4px] mb-2.5 text-[#EDF0F4]">Get WhatsApp Alerts</h3>
                            <p className="text-[#98A0AE] text-[13.5px] leading-[1.65]">The moment something is published, it lands in your WhatsApp with the filing PDF attached. Sub-second latency.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* FEATURES */}
            <section id="features" className="relative z-10 bg-[#0B0E16]/55 border-y border-[#1E2535]">
                <div className="max-w-[1180px] mx-auto px-6 py-24">
                    <div className="text-center max-w-[620px] mx-auto mb-[60px] reveal">
                        <span className="inline-block text-[11.5px] font-black tracking-[2.2px] uppercase text-[#33D097] mb-4">Benefits</span>
                        <h2 className="font-display text-[28px] md:text-[42px] font-bold tracking-[-1.2px] leading-[1.12] text-[#EDF0F4]">Why investors use EquityAlerts</h2>
                        <p className="text-[#98A0AE] text-[15.5px] mt-4 leading-[1.65]">A robust, lightweight alerts terminal built for modern market participants.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-[18px]">
                        <div className="feat-card bg-[#10141E] border border-[#1E2535] rounded-[18px] p-[28px] hover:-translate-y-[5px] hover:border-[#33D097]/18 transition-all duration-300 relative overflow-hidden reveal">
                            <div className="w-[42px] h-[42px] rounded-[12px] bg-[#33D097]/8 border border-[#33D097]/16 flex items-center justify-center mb-[18px]">
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                                    <path d="M12 3v2M12 19v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M3 12h2M19 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" stroke="#33D097" strokeWidth="1.8" strokeLinecap="round"/>
                                    <circle cx="12" cy="12" r="4" stroke="#33D097" strokeWidth="1.8"/>
                                </svg>
                            </div>
                            <h4 className="text-[15.5px] font-bold mb-2 tracking-[-0.2px] text-[#EDF0F4]">Never miss announcements</h4>
                            <p className="text-[#98A0AE] text-[13px] leading-[1.65]">Continuous feeds covering corporate announcements, quarterly earnings and regulatory changes.</p>
                        </div>
                        <div className="feat-card bg-[#10141E] border border-[#1E2535] rounded-[18px] p-[28px] hover:-translate-y-[5px] hover:border-[#33D097]/18 transition-all duration-300 relative overflow-hidden reveal transition-delay-[0.06s]">
                            <div className="w-[42px] h-[42px] rounded-[12px] bg-[#33D097]/8 border border-[#33D097]/16 flex items-center justify-center mb-[18px]">
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                                    <circle cx="12" cy="12" r="9" stroke="#33D097" strokeWidth="1.8"/>
                                    <path d="M12 7v5l3.5 2" stroke="#33D097" strokeWidth="1.8" strokeLinecap="round"/>
                                </svg>
                            </div>
                            <h4 className="text-[15.5px] font-bold mb-2 tracking-[-0.2px] text-[#EDF0F4]">No manual checking</h4>
                            <p className="text-[#98A0AE] text-[13px] leading-[1.65]">Save hours scrolling BSE and NSE filing logs. The critical content gets pushed to you automatically.</p>
                        </div>
                        <div className="feat-card bg-[#10141E] border border-[#1E2535] rounded-[18px] p-[28px] hover:-translate-y-[5px] hover:border-[#33D097]/18 transition-all duration-300 relative overflow-hidden reveal transition-delay-[0.12s]">
                            <div className="w-[42px] h-[42px] rounded-[12px] bg-[#33D097]/8 border border-[#33D097]/16 flex items-center justify-center mb-[18px]">
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                                    <path d="M21 11.5a8.4 8.4 0 01-9.3 8.4 8.6 8.6 0 01-3.9-1L3 20l1.2-4.6A8.4 8.4 0 1121 11.5z" stroke="#33D097" strokeWidth="1.8" strokeLinejoin="round"/>
                                </svg>
                            </div>
                            <h4 className="text-[15.5px] font-bold mb-2 tracking-[-0.2px] text-[#EDF0F4]">WhatsApp notifications</h4>
                            <p className="text-[#98A0AE] text-[13px] leading-[1.65]">Alerts arrive directly in your messaging app. Tap to read disclosure PDFs on the go.</p>
                        </div>
                        <div className="feat-card bg-[#10141E] border border-[#1E2535] rounded-[18px] p-[28px] hover:-translate-y-[5px] hover:border-[#33D097]/18 transition-all duration-300 relative overflow-hidden reveal">
                            <div className="w-[42px] h-[42px] rounded-[12px] bg-[#33D097]/8 border border-[#33D097]/16 flex items-center justify-center mb-[18px]">
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                                    <path d="M13 3L4 14h6l-1 7 9-11h-6l1-7z" stroke="#33D097" strokeWidth="1.8" strokeLinejoin="round"/>
                                </svg>
                            </div>
                            <h4 className="text-[15.5px] font-bold mb-2 tracking-[-0.2px] text-[#EDF0F4]">Simple setup</h4>
                            <p className="text-[#98A0AE] text-[13px] leading-[1.65]">Register with your phone number, authenticate via OTP, and define your watchlist instantly.</p>
                        </div>
                        <div className="feat-card bg-[#10141E] border border-[#1E2535] rounded-[18px] p-[28px] hover:-translate-y-[5px] hover:border-[#33D097]/18 transition-all duration-300 relative overflow-hidden reveal transition-delay-[0.06s]">
                            <div className="w-[42px] h-[42px] rounded-[12px] bg-[#33D097]/8 border border-[#33D097]/16 flex items-center justify-center mb-[18px]">
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                                    <rect x="3" y="4" width="18" height="14" rx="2.5" stroke="#33D097" strokeWidth="1.8"/>
                                    <path d="M7 9h4M7 13h7" stroke="#33D097" strokeWidth="1.8" strokeLinecap="round"/>
                                </svg>
                            </div>
                            <h4 className="text-[15.5px] font-bold mb-2 tracking-[-0.2px] text-[#EDF0F4]">Track multiple companies</h4>
                            <p className="text-[#98A0AE] text-[13px] leading-[1.65]">Customise watchlists based on your plan. Monitor up to 25 firms simultaneously.</p>
                        </div>
                        <div className="feat-card bg-[#10141E] border border-[#1E2535] rounded-[18px] p-[28px] hover:-translate-y-[5px] hover:border-[#33D097]/18 transition-all duration-300 relative overflow-hidden reveal transition-delay-[0.12s]">
                            <div className="w-[42px] h-[42px] rounded-[12px] bg-[#33D097]/8 border border-[#33D097]/16 flex items-center justify-center mb-[18px]">
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                                    <path d="M3 17l5-6 4 4 6-8 3 3" stroke="#33D097" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </div>
                            <h4 className="text-[15.5px] font-bold mb-2 tracking-[-0.2px] text-[#EDF0F4]">Fast and lightweight</h4>
                            <p className="text-[#98A0AE] text-[13px] leading-[1.65]">Optimised architecture delivering sub-second search, filters and live updates.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* WHAT WE MONITOR */}
            <section id="monitor" className="relative z-10 py-24">
                <div className="max-w-[1180px] mx-auto px-6">
                    <div className="text-center max-w-[620px] mx-auto mb-[60px] reveal">
                        <span className="inline-block text-[11.5px] font-black tracking-[2.2px] uppercase text-[#33D097] mb-4">Coverage</span>
                        <h2 className="font-display text-[28px] md:text-[42px] font-bold tracking-[-1.2px] leading-[1.12] text-[#EDF0F4]">What we monitor</h2>
                        <p className="text-[#98A0AE] text-[15.5px] mt-4 leading-[1.65]">Instant tracking of the key events that move prices, straight from regulatory filing databases.</p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-[14px]">
                        {[
                            { icon: "📊", name: "Quarterly Results", delay: "" },
                            { icon: "💰", name: "Dividends", delay: "transition-delay-[0.04s]" },
                            { icon: "🗓️", name: "Board Meetings", delay: "transition-delay-[0.08s]" },
                            { icon: "🤝", name: "Acquisitions", delay: "transition-delay-[0.12s]" },
                            { icon: "🎁", name: "Bonus Issues", delay: "" },
                            { icon: "📜", name: "Rights Issues", delay: "transition-delay-[0.04s]" },
                            { icon: "⚖️", name: "Regulatory Filings", delay: "transition-delay-[0.08s]" },
                            { icon: "👥", name: "Shareholding Updates", delay: "transition-delay-[0.12s]" }
                        ].map((chip, idx) => (
                            <div key={idx} className={`bg-[#10141E] border border-[#1E2535] rounded-[14px] px-[19px] py-[17px] flex items-center gap-[11px] text-[13.5px] font-semibold hover:border-[#33D097]/18 hover:-translate-y-[3px] transition-all duration-250 cursor-default text-[#EDF0F4] reveal ${chip.delay}`}>
                                <span className="w-[30px] h-[30px] rounded-[9px] bg-[#33D097]/8 flex items-center justify-center text-[14px] shrink-0">{chip.icon}</span>
                                {chip.name}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* PRICING */}
            <section id="pricing" className="relative z-10 bg-[#0B0E16]/55 border-y border-[#1E2535]">
                <div className="max-w-[1180px] mx-auto px-6 py-24">
                    <div className="text-center max-w-[620px] mx-auto mb-[60px] reveal">
                        <span className="inline-block text-[11.5px] font-black tracking-[2.2px] uppercase text-[#33D097] mb-4">Pricing</span>
                        <h2 className="font-display text-[28px] md:text-[42px] font-bold tracking-[-1.2px] leading-[1.12] text-[#EDF0F4]">Simple, honest pricing</h2>
                        <p className="text-[#98A0AE] text-[15.5px] mt-4 leading-[1.65]">Start free. Upgrade when your watchlist grows.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-[26px] max-w-[800px] mx-auto justify-center items-stretch">
                        <div className="bg-[#10141E] border border-[#1E2535] rounded-[24px] p-9 flex flex-col hover:-translate-y-[6px] transition-all duration-300 relative reveal text-left">
                            <div className="text-[12px] font-black tracking-[2px] uppercase text-[#98A0AE]">Free</div>
                            <div className="font-display text-[52px] font-bold tracking-[-2px] mt-[14px] mb-1 text-[#EDF0F4]">
                                ₹0 <small className="text-[14px] text-[#646E7E] font-semibold tracking-normal font-sans">forever</small>
                            </div>
                            <div className="text-[13px] text-[#98A0AE] mb-[26px] leading-[1.5]">For investors getting started with announcement tracking.</div>
                            <ul className="list-none flex flex-col gap-[13px] mb-8 flex-1">
                                <li className="flex gap-[11px] text-[13.5px] text-[#98A0AE] font-semibold items-start">
                                    <svg className="w-[17px] h-[17px] shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none">
                                        <circle cx="12" cy="12" r="10" stroke="#33D097" strokeWidth="2"/>
                                        <path d="M8 12l3 3 5-6" stroke="#33D097" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    <span>Access all 200+ companies</span>
                                </li>
                                <li className="flex gap-[11px] text-[13.5px] text-[#98A0AE] font-semibold items-start">
                                    <svg className="w-[17px] h-[17px] shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none">
                                        <circle cx="12" cy="12" r="10" stroke="#33D097" strokeWidth="2"/>
                                        <path d="M8 12l3 3 5-6" stroke="#33D097" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    <span>Track up to <b className="text-[#EDF0F4]">5 companies</b></span>
                                </li>
                                <li className="flex gap-[11px] text-[13.5px] text-[#98A0AE] font-semibold items-start">
                                    <svg className="w-[17px] h-[17px] shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none">
                                        <circle cx="12" cy="12" r="10" stroke="#33D097" strokeWidth="2"/>
                                        <path d="M8 12l3 3 5-6" stroke="#33D097" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    <span>Real-time WhatsApp alerts</span>
                                </li>
                            </ul>
                            <button
                                onClick={() => navigate("/register")}
                                className="w-full bg-transparent text-[#EDF0F4] border border-[#1E2535] font-bold text-[13.5px] rounded-[12px] h-[44px] hover:border-[#33D097] hover:text-[#33D097] hover:-translate-y-[2px] active:scale-[0.97] transition-all duration-180 flex items-center justify-center gap-2 cursor-pointer"
                            >
                                Get Started
                            </button>
                        </div>
                        <div className="price-hot rounded-[24px] p-9 flex flex-col hover:-translate-y-[6px] transition-all duration-300 relative reveal text-left transition-delay-[0.1s]">
                            <span className="absolute -top-[14px] left-1/2 -translate-x-1/2 bg-brand-grad text-[#04130C] text-[10.5px] font-black tracking-[1.4px] uppercase px-[18px] py-[7px] rounded-full shadow-[0_6px_20px_rgba(51,208,151,0.4)]">Most Popular</span>
                            <div className="text-[12px] font-black tracking-[2px] uppercase text-[#33D097]">Premium</div>
                            <div className="font-display text-[52px] font-bold tracking-[-2px] mt-[14px] mb-1 text-[#EDF0F4]">
                                ₹119 <small className="text-[14px] text-[#646E7E] font-semibold tracking-normal font-sans">/ month</small>
                            </div>
                            <div className="text-[13px] text-[#98A0AE] mb-[26px] leading-[1.5]">For active investors who track a full portfolio.</div>
                            <ul className="list-none flex flex-col gap-[13px] mb-8 flex-1">
                                <li className="flex gap-[11px] text-[13.5px] text-[#98A0AE] font-semibold items-start">
                                    <svg className="w-[17px] h-[17px] shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none">
                                        <circle cx="12" cy="12" r="10" stroke="#33D097" strokeWidth="2"/>
                                        <path d="M8 12l3 3 5-6" stroke="#33D097" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    <span>Access all 200+ companies</span>
                                </li>
                                <li className="flex gap-[11px] text-[13.5px] text-[#98A0AE] font-semibold items-start">
                                    <svg className="w-[17px] h-[17px] shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none">
                                        <circle cx="12" cy="12" r="10" stroke="#33D097" strokeWidth="2"/>
                                        <path d="M8 12l3 3 5-6" stroke="#33D097" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    <span>Track up to <b className="text-[#EDF0F4]">25 companies</b></span>
                                </li>
                                <li className="flex gap-[11px] text-[13.5px] text-[#98A0AE] font-semibold items-start">
                                    <svg className="w-[17px] h-[17px] shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none">
                                        <circle cx="12" cy="12" r="10" stroke="#33D097" strokeWidth="2"/>
                                        <path d="M8 12l3 3 5-6" stroke="#33D097" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    <span>Real-time WhatsApp alerts</span>
                                </li>
                                <li className="flex gap-[11px] text-[13.5px] text-[#98A0AE] font-semibold items-start">
                                    <svg className="w-[17px] h-[17px] shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none">
                                        <circle cx="12" cy="12" r="10" stroke="#33D097" strokeWidth="2"/>
                                        <path d="M8 12l3 3 5-6" stroke="#33D097" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    <span>Priority alert delivery</span>
                                </li>
                            </ul>
                            <button
                                onClick={() => navigate("/register")}
                                className="w-full bg-brand-grad text-[#04130C] font-bold text-[13.5px] rounded-[12px] h-[44px] shadow-[0_6px_28px_rgba(51,208,151,0.32)] hover:shadow-[0_10px_36px_rgba(51,208,151,0.45)] hover:-translate-y-[2px] active:scale-[0.97] transition-all duration-180 flex items-center justify-center gap-2 cursor-pointer border-none"
                            >
                                Go Premium →
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section id="faq" className="relative z-10 py-24">
                <div className="max-w-[1180px] mx-auto px-6">
                    <div className="text-center max-w-[620px] mx-auto mb-[60px] reveal">
                        <span className="inline-block text-[11.5px] font-black tracking-[2.2px] uppercase text-[#33D097] mb-4">FAQ</span>
                        <h2 className="font-display text-[28px] md:text-[42px] font-bold tracking-[-1.2px] leading-[1.12] text-[#EDF0F4]">Frequently asked questions</h2>
                    </div>
                    <div className="max-w-[720px] mx-auto flex flex-col gap-3 reveal text-left">
                        <details className="faq-item bg-[#10141E] border border-[#1E2535] rounded-[16px] overflow-hidden" open>
                            <summary className="px-6 py-5 text-[14.5px] font-bold cursor-pointer list-none flex justify-between items-center gap-[14px] text-[#EDF0F4]">
                                How fast do alerts arrive after an announcement?
                            </summary>
                            <div className="px-6 pb-[22px] text-[13.5px] text-[#98A0AE] leading-[1.7]">
                                Our engine monitors exchange filings continuously and dispatches WhatsApp alerts with sub-second processing latency — typically you'll have the announcement before it trends anywhere else.
                            </div>
                        </details>
                        <details className="faq-item bg-[#10141E] border border-[#1E2535] rounded-[16px] overflow-hidden">
                            <summary className="px-6 py-5 text-[14.5px] font-bold cursor-pointer list-none flex justify-between items-center gap-[14px] text-[#EDF0F4]">
                                Do I need to install an app?
                            </summary>
                            <div className="px-6 pb-[22px] text-[13.5px] text-[#98A0AE] leading-[1.7]">
                                No. Alerts arrive directly on WhatsApp, and your watchlist is managed from this web portal. Nothing to install, nothing to keep open.
                            </div>
                        </details>
                        <details className="faq-item bg-[#10141E] border border-[#1E2535] rounded-[16px] overflow-hidden">
                            <summary className="px-6 py-5 text-[14.5px] font-bold cursor-pointer list-none flex justify-between items-center gap-[14px] text-[#EDF0F4]">
                                What does the free plan include?
                            </summary>
                            <div className="px-6 pb-[22px] text-[13.5px] text-[#98A0AE] leading-[1.7]">
                                The free plan is free forever and lets you track up to 5 companies with full real-time WhatsApp alerts. Upgrade to Premium (₹119/month) to track up to 25 companies.
                            </div>
                        </details>
                        <details className="faq-item bg-[#10141E] border border-[#1E2535] rounded-[16px] overflow-hidden">
                            <summary className="px-6 py-5 text-[14.5px] font-bold cursor-pointer list-none flex justify-between items-center gap-[14px] text-[#EDF0F4]">
                                Is this investment advice?
                            </summary>
                            <div className="px-6 pb-[22px] text-[13.5px] text-[#98A0AE] leading-[1.7]">
                                No. EquityAlerts provides informational alerts only and does not offer investment advice. Always do your own research before making investment decisions.
                            </div>
                        </details>
                    </div>
                </div>
            </section>

            {/* FINAL CTA */}
            <section className="relative z-10 py-24 pt-5">
                <div className="max-w-[1180px] mx-auto px-6">
                    <div className="cta-glow relative rounded-[28px] py-[74px] px-10 text-center overflow-hidden bg-[#10141E] border border-[#1E2535] reveal">
                        <h2 className="font-display text-[30px] md:text-[46px] font-bold tracking-[-1.4px] relative text-[#EDF0F4] z-[1]">
                            Start tracking companies <span className="grad-text">today</span>
                        </h2>
                        <p className="text-[#98A0AE] text-[15.5px] mt-[18px] mb-[34px] mx-auto max-w-[460px] leading-[1.65] relative z-[1]">
                            Create a free account and get your first WhatsApp alert in minutes. No credit card required.
                        </p>
                        <div className="flex gap-[14px] flex-wrap justify-center relative z-[1]">
                            <button
                                onClick={() => navigate("/register")}
                                className="inline-flex items-center justify-center gap-2 font-sans font-bold text-[14.5px] rounded-[14px] px-[30px] h-[52px] cursor-pointer bg-brand-grad text-[#04130C] shadow-[0_6px_28px_rgba(51,208,151,0.32)] hover:shadow-[0_10px_36px_rgba(51,208,151,0.45)] hover:-translate-y-[2px] active:scale-[0.97] transition-all duration-180"
                            >
                                Create Free Account
                            </button>
                            <button
                                onClick={() => navigate("/login")}
                                className="inline-flex items-center justify-center gap-2 font-sans font-bold text-[14.5px] rounded-[14px] px-[30px] h-[52px] cursor-pointer bg-transparent text-[#EDF0F4] border border-[#1E2535] hover:border-[#33D097] hover:text-[#33D097] hover:-translate-y-[2px] active:scale-[0.97] transition-all duration-180"
                            >
                                Login
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="border-t border-[#1E2535] bg-[#07090F]/85 py-[60px] pb-8 relative z-10 text-left">
                <div className="max-w-[1180px] mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-[1.4fr_1fr_1fr_1fr] gap-10 mb-[48px]">
                        <div>
                            <div className="flex items-center gap-[11px]">
                                <div className="w-8 h-8 rounded-[9px] bg-brand-grad flex items-center justify-center">
                                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                                        <path d="M3 17l5-6 4 4 6-8 3 3" stroke="#04130C" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </div>
                                <span className="font-display font-bold text-[16px] text-[#EDF0F4]">EquityAlerts</span>
                            </div>
                            <p className="text-[#646E7E] text-[12.5px] leading-[1.7] mt-3.5 max-w-[260px]">
                                Company announcement monitoring for NSE &amp; BSE. Informational alerts only — not investment advice.
                            </p>
                        </div>
                        <div>
                            <h5 className="text-[11px] font-black tracking-[1.8px] uppercase text-[#646E7E] mb-[18px]">Product</h5>
                            <a href="#features" className="block text-[13.5px] text-[#98A0AE] font-semibold mb-3 hover:text-[#33D097] transition duration-200">Features</a>
                            <a href="#monitor" className="block text-[13.5px] text-[#98A0AE] font-semibold mb-3 hover:text-[#33D097] transition duration-200">Coverage</a>
                            <a href="#pricing" className="block text-[13.5px] text-[#98A0AE] font-semibold mb-3 hover:text-[#33D097] transition duration-200">Pricing</a>
                        </div>
                        <div>
                            <h5 className="text-[11px] font-black tracking-[1.8px] uppercase text-[#646E7E] mb-[18px]">Account</h5>
                            <Link to="/login" className="block text-[13.5px] text-[#98A0AE] font-semibold mb-3 hover:text-[#33D097] transition duration-200">Login</Link>
                            <Link to="/register" className="block text-[13.5px] text-[#98A0AE] font-semibold mb-3 hover:text-[#33D097] transition duration-200">Register</Link>
                            <Link to="/plans" className="block text-[13.5px] text-[#98A0AE] font-semibold mb-3 hover:text-[#33D097] transition duration-200">Plans</Link>
                        </div>
                        <div>
                            <h5 className="text-[11px] font-black tracking-[1.8px] uppercase text-[#646E7E] mb-[18px]">Support</h5>
                            <a href="mailto:support@equityalerts.ai" className="block text-[13.5px] text-[#98A0AE] font-semibold mb-3 hover:text-[#33D097] transition duration-200">Contact</a>
                            <a href="#faq" className="block text-[13.5px] text-[#98A0AE] font-semibold mb-3 hover:text-[#33D097] transition duration-200">FAQ</a>
                        </div>
                    </div>
                    <div className="border-t border-[#1E2535] pt-[26px] flex justify-between items-center gap-4 flex-wrap text-[11.5px] text-[#646E7E]">
                        <span>© 2026 EquityAlerts. All rights reserved.</span>
                        <div className="flex gap-5">
                            <Link to="/privacy-policy" className="hover:text-[#33D097] transition-colors">Privacy Policy</Link>
                            <Link to="/terms-of-service" className="hover:text-[#33D097] transition-colors">Terms of Service</Link>
                            <Link to="/disclaimer" className="hover:text-[#33D097] transition-colors">Disclaimer</Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default LandingPage;