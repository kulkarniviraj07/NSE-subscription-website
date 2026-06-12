import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { MarketChartBackground } from "../../components/common/MarketChartBackground";

/**
 * High-fidelity, dual-step OTP Login Page for EquityAlerts.
 */
export function Login() {
    const { login, verifyLogin } = useAuth();
    const navigate = useNavigate();

    // Verification steps: "MOBILE" or "OTP"
    const [step, setStep] = useState("MOBILE");
    
    // Inputs
    const [mobile, setMobile] = useState("");
    const [otp, setOtp] = useState("");
    
    // UI Helpers
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    // Simple mobile regex check (e.g. 10 digits)
    const validateMobile = (num) => {
        return /^\d{10}$/.test(num);
    };

    /**
     * Phase 1: Submit Mobile Number to request WhatsApp OTP
     */
    const handleSendOtp = async (e) => {
        e.preventDefault();
        setError("");
        setSuccessMessage("");

        if (!mobile) {
            setError("Mobile number is required");
            return;
        }

        if (!validateMobile(mobile)) {
            setError("Please enter a valid 10-digit mobile number");
            return;
        }

        try {
            setLoading(true);
            await login(mobile);
            setSuccessMessage("OTP sent! Check your WhatsApp for the code.");
            setStep("OTP");
        } catch (err) {
            setError(
                err?.response?.data?.message || 
                "Failed to send verification code. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    /**
     * Phase 2: Submit OTP to verify and sign in
     */
    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        setError("");

        if (!otp) {
            setError("Verification code is required");
            return;
        }

        if (otp.length < 4) {
            setError("Verification code must be at least 4 digits");
            return;
        }

        try {
            setLoading(true);
            await verifyLogin(mobile, otp);
            navigate("/dashboard");
        } catch (err) {
            setError(
                err?.response?.data?.message || 
                "Invalid code entered. Please check and try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0C0E14] flex items-center justify-center px-4 py-8 relative overflow-hidden font-sans">
            {/* Ambient Stock Market terminal graphics */}
            <MarketChartBackground />

            {/* Layout Wrapper: Center box on mobile, Grid on desktop */}
            <div className="w-full max-w-md md:max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10 items-stretch">
                
                {/* Left Card: Secure Login Form */}
                <div className="w-full bg-[#151921]/60 backdrop-blur-md rounded-3xl border border-[#222A38] p-8 sm:p-10 shadow-2xl flex flex-col justify-center">
                    {/* Brand Logo Header */}
                    <div className="flex flex-col items-center text-center">
                        <div className="w-16 h-16 bg-[#151921] border border-[#222A38] rounded-2xl flex items-center justify-center mb-6 shadow-lg glow-cyan">
                            <span className="font-extrabold text-2xl text-brand-cyan">EA</span>
                        </div>

                        <h1 className="text-3xl font-extrabold text-[#E3E5EA] tracking-tight">
                            Secure Login
                        </h1>

                        <p className="text-brand-slate text-sm mt-2 max-w-xs leading-relaxed">
                            Access premium corporate disclosures and watchlist alerts via WhatsApp OTP.
                        </p>
                    </div>

                    {/* Main Auth Form Container */}
                    <div className="mt-8">
                        {step === "MOBILE" ? (
                            <form onSubmit={handleSendOtp} className="space-y-5">
                                <Input
                                    label="Mobile Number"
                                    value={mobile}
                                    onChange={(e) => {
                                        setMobile(e.target.value.replace(/\D/g, ""));
                                        setError("");
                                    }}
                                    placeholder="Enter your 10-digit number"
                                    type="tel"
                                    maxLength="10"
                                    error={error}
                                    icon={
                                        <svg className="w-5 h-5 text-brand-slate" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                    }
                                />

                                <Button
                                    type="submit"
                                    loading={loading}
                                    disabled={loading}
                                    className="w-full"
                                >
                                    Send OTP via WhatsApp
                                </Button>
                            </form>
                        ) : (
                            <form onSubmit={handleVerifyOtp} className="space-y-5">
                                {successMessage && (
                                    <div className="p-3 bg-brand-dark border border-brand-cyan text-brand-cyan rounded-xl text-xs font-semibold text-center">
                                        {successMessage}
                                    </div>
                                )}

                                <div className="space-y-1 text-center">
                                    <span className="text-xs text-brand-slate">
                                        Verifying connection for:
                                    </span>
                                    <span className="block text-sm font-bold text-brand-light font-mono">
                                        +91 {mobile}
                                    </span>
                                </div>

                                <Input
                                    label="Verification Code (OTP)"
                                    value={otp}
                                    onChange={(e) => {
                                        setOtp(e.target.value.replace(/\D/g, ""));
                                        setError("");
                                    }}
                                    placeholder="Enter code"
                                    type="text"
                                    maxLength="6"
                                    error={error}
                                    icon={
                                        <svg className="w-5 h-5 text-brand-slate" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                    }
                                />

                                <div className="flex gap-3">
                                    <Button
                                        variant="outline"
                                        type="button"
                                        onClick={() => {
                                            setStep("MOBILE");
                                            setError("");
                                            setOtp("");
                                        }}
                                        className="flex-1 !text-brand-light hover:!bg-brand-dark !border-brand-border"
                                    >
                                        Back
                                    </Button>
                                    <Button
                                        type="submit"
                                        loading={loading}
                                        disabled={loading}
                                        className="flex-1"
                                    >
                                        Verify OTP
                                    </Button>
                                </div>
                            </form>
                        )}

                        {/* Bottom registration link */}
                        <div className="mt-8 text-center text-xs text-brand-slate border-t border-brand-border/50 pt-5">
                            Don't have an account?{" "}
                            <Link
                                to="/register"
                                className="font-bold text-brand-cyan hover:underline transition-colors animate-pulse"
                            >
                                Register Here
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Right Card: Mobile WhatsApp Notification Live Simulator (Desktop Only) */}
                <div className="hidden md:flex flex-col justify-between p-8 bg-[#151921]/60 backdrop-blur-md rounded-3xl border border-[#222A38] shadow-2xl font-mono text-xs text-[#9298A0] relative overflow-hidden">
                    <div className="absolute inset-0 bg-market-grid opacity-10 pointer-events-none" />
                    
                    <div className="space-y-6 relative z-10 text-left">
                        <div className="flex items-center justify-between border-b border-[#222A38] pb-3">
                            <span className="text-[10px] font-bold text-brand-cyan uppercase tracking-wider">WhatsApp Alert Feed</span>
                            <span className="text-[9px] bg-[#33D097]/10 text-brand-cyan border border-[#33D097]/20 px-2 py-0.5 rounded font-bold">SIMULATOR</span>
                        </div>

                        <div className="space-y-4">
                            <span className="text-[10px] text-brand-textMuted font-bold uppercase tracking-wider block">Mock Dispatch Logs</span>
                            
                            {/* WhatsApp alert cards */}
                            <div className="space-y-3">
                                {step === "OTP" && (
                                    <div className="p-3 bg-[#0C0E14] border border-brand-cyan/40 rounded-2xl relative shadow-md animate-pulse">
                                        <div className="flex items-center gap-2 mb-1.5">
                                            <div className="w-5 h-5 bg-[#33D097] rounded-full flex items-center justify-center text-[10px] font-bold text-[#0C0E14]">EA</div>
                                            <span className="text-[11px] font-bold text-[#E3E5EA]">EquityAlerts</span>
                                            <span className="text-[9px] text-[#6B7280] ml-auto">Just now</span>
                                        </div>
                                        <div className="text-[10px] text-brand-light leading-relaxed">
                                            🔐 <strong>EquityAlerts OTP Verification</strong><br/><br/>
                                            Your one-time password is:<br/>
                                            <span className="block text-brand-cyan text-sm font-bold font-mono tracking-widest mt-1 bg-[#151921] p-2 rounded text-center border border-[#222A38]">{otp || "● ● ● ● ● ●"}</span><br/>
                                            This OTP is valid for 5 minutes. Do not share it with anyone.
                                        </div>
                                    </div>
                                )}

                                <div className="p-3 bg-[#0C0E14] border border-[#222A38] rounded-2xl relative shadow-md opacity-80">
                                    <div className="flex items-center gap-2 mb-1.5">
                                        <div className="w-5 h-5 bg-[#33D097] rounded-full flex items-center justify-center text-[10px] font-bold text-[#0C0E14]">EA</div>
                                        <span className="text-[11px] font-bold text-[#E3E5EA]">EquityAlerts alerts</span>
                                        <span className="text-[9px] text-[#6B7280] ml-auto">5m ago</span>
                                    </div>
                                    <p className="text-[10px] text-brand-light leading-relaxed">
                                        🚨 <strong>RELIANCE (NSE)</strong>: Board meeting scheduled on June 15, 2026 to consider dividend payments and financial statements. <span className="text-brand-cyan hover:underline cursor-pointer font-bold block mt-1">Read PDF Document →</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-6 border-t border-[#222A38] mt-6 text-[10px] text-brand-textMuted text-left relative z-10 flex items-center gap-2">
                        <span className="w-2 h-2 bg-[#33D097] rounded-full animate-ping" />
                        <span>Instant verification and alerts sent straight to your device.</span>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Login;
