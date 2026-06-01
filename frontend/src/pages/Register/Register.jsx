import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

/**
 * High-fidelity, dual-step registration page for PureFrames.
 */
export function Register() {
    const { register, verifyRegister } = useAuth();
    const navigate = useNavigate();

    // Steps: "DETAILS" or "OTP"
    const [step, setStep] = useState("DETAILS");
    
    // Inputs
    const [name, setName] = useState("");
    const [mobile, setMobile] = useState("");
    const [otp, setOtp] = useState("");

    // UI Helpers
    const [loading, setLoading] = useState(false);
    const [nameError, setNameError] = useState("");
    const [mobileError, setMobileError] = useState("");
    const [otpError, setOtpError] = useState("");
    const [apiError, setApiError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const validateMobile = (num) => {
        return /^\d{10}$/.test(num);
    };

    /**
     * Phase 1: Submit Details to request SMS OTP
     */
    const handleRegisterDetails = async (e) => {
        e.preventDefault();
        setNameError("");
        setMobileError("");
        setApiError("");

        let isValid = true;

        if (!name.trim()) {
            setNameError("Full name is required");
            isValid = false;
        }

        if (!mobile) {
            setMobileError("Mobile number is required");
            isValid = false;
        } else if (!validateMobile(mobile)) {
            setMobileError("Please enter a valid 10-digit number");
            isValid = false;
        }

        if (!isValid) return;

        try {
            setLoading(true);
            await register(name, mobile);
            setSuccessMessage("Verification code dispatched!");
            setStep("OTP");
        } catch (err) {
            setApiError(
                err?.response?.data?.message || 
                "Registration failed. Mobile may already be verified or network is slow."
            );
        } finally {
            setLoading(false);
        }
    };

    /**
     * Phase 2: Submit Details + OTP to complete verification & creation
     */
    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        setOtpError("");
        setApiError("");

        if (!otp) {
            setOtpError("Verification code is required");
            return;
        }

        try {
            setLoading(true);
            await verifyRegister(name, mobile, otp);
            navigate("/dashboard");
        } catch (err) {
            setOtpError(
                err?.response?.data?.message || 
                "Verification failed. The code entered may be incorrect."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-brand-navy flex items-center justify-center px-4 relative overflow-hidden font-sans">
            {/* Ambient background glows */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-brand-cyan/5 rounded-full blur-3xl pointer-events-none -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-brand-cyan/5 rounded-full blur-3xl pointer-events-none translate-x-1/2 translate-y-1/2" />

            <div className="w-full max-w-[440px] bg-brand-dark/40 backdrop-blur-md rounded-3xl border border-slate-800 p-8 sm:p-10 shadow-2xl relative z-10">
                {/* Header */}
                <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-brand-cyan rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-cyan-500/20 glow-cyan">
                        <span className="font-extrabold text-2xl text-brand-navy">PF</span>
                    </div>

                    <h1 className="text-3xl font-extrabold text-white tracking-tight">
                        Create Account
                    </h1>

                    <p className="text-slate-400 text-sm mt-2 max-w-xs leading-relaxed">
                        Register to unlock real-time financial tracking widgets.
                    </p>
                </div>

                {/* Form Wrapper */}
                <div className="mt-8">
                    {apiError && (
                        <div className="p-3 bg-red-950/30 border border-red-800/80 text-red-400 rounded-xl text-xs font-semibold text-center mb-5">
                            {apiError}
                        </div>
                    )}

                    {step === "DETAILS" ? (
                        <form onSubmit={handleRegisterDetails} className="space-y-4">
                            <Input
                                label="Full Name"
                                value={name}
                                onChange={(e) => {
                                    setName(e.target.value);
                                    setNameError("");
                                }}
                                placeholder="Enter your full name"
                                error={nameError}
                                icon={
                                    <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                }
                            />

                            <Input
                                label="Mobile Number"
                                value={mobile}
                                onChange={(e) => {
                                    setMobile(e.target.value.replace(/\D/g, ""));
                                    setMobileError("");
                                }}
                                placeholder="Enter your 10-digit number"
                                type="tel"
                                maxLength="10"
                                error={mobileError}
                                icon={
                                    <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                }
                            />

                            <div className="pt-2">
                                <Button
                                    type="submit"
                                    loading={loading}
                                    disabled={loading}
                                    className="w-full"
                                >
                                    Register & Request Code
                                </Button>
                            </div>
                        </form>
                    ) : (
                        <form onSubmit={handleVerifyOtp} className="space-y-5">
                            {successMessage && (
                                <div className="p-3 bg-cyan-950/30 border border-cyan-800 text-cyan-400 rounded-xl text-xs font-semibold text-center">
                                    {successMessage}
                                </div>
                            )}

                            <div className="space-y-1 text-center">
                                <span className="text-xs text-slate-400">
                                    Verifying phone connection:
                                </span>
                                <span className="block text-sm font-bold text-white">
                                    +91 {mobile}
                                </span>
                            </div>

                            <Input
                                label="Verification Code (OTP)"
                                value={otp}
                                onChange={(e) => {
                                    setOtp(e.target.value.replace(/\D/g, ""));
                                    setOtpError("");
                                }}
                                placeholder="Enter code"
                                type="text"
                                maxLength="6"
                                error={otpError}
                                icon={
                                    <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                }
                            />

                            <div className="flex gap-3">
                                <Button
                                    variant="outline"
                                    type="button"
                                    onClick={() => {
                                        setStep("DETAILS");
                                        setOtpError("");
                                        setOtp("");
                                    }}
                                    className="flex-1 !text-white hover:!bg-slate-800/40 !border-slate-800"
                                >
                                    Back
                                </Button>
                                <Button
                                    type="submit"
                                    loading={loading}
                                    disabled={loading}
                                    className="flex-1"
                                >
                                    Verify Code
                                </Button>
                            </div>
                        </form>
                    )}

                    {/* Bottom login link */}
                    <div className="mt-8 text-center text-xs text-slate-400 border-t border-slate-800/50 pt-5">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="font-bold text-brand-cyan hover:underline transition-colors"
                        >
                            Sign In Here
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
