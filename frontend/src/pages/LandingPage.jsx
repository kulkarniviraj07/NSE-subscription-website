import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Input from "../components/Input";
import Button from "../components/Button";

import { sendOtp } from "../services/authApi";

function LandingPage() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [mobile, setMobile] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleContinue() {
        try {
            setLoading(true);

            await sendOtp({
                name,
                mobile
            });

            localStorage.setItem("name", name);
            localStorage.setItem("mobile", mobile);

            navigate("/otp");
        }
        catch (err) {
            alert(
                err?.response?.data?.message ||
                "Failed to send OTP"
            );
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-4 relative overflow-hidden">
            {/* Decorative background gradients */}
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="w-full max-w-md bg-white rounded-[32px] shadow-xl shadow-slate-100/50 border border-slate-100 p-8 sm:p-10 relative z-10">
                
                {/* Modern Bell Logo Header */}
                <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
                        <svg 
                            className="w-8 h-8 text-[#2563EB]" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor" 
                            strokeWidth="2"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" 
                            />
                        </svg>
                    </div>

                    <h1 className="text-3xl font-extrabold text-[#0F172A] tracking-tight">
                        NSE Alerts
                    </h1>

                    <p className="text-[#64748B] text-[15px] mt-2 leading-relaxed">
                        Stay updated with important company announcements.
                    </p>
                </div>

                {/* Form fields & Continue Action */}
                <div className="mt-8 space-y-4">
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-[#64748B] uppercase tracking-wider pl-1">
                            Full Name
                        </label>
                        <Input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Full Name"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-[#64748B] uppercase tracking-wider pl-1">
                            Mobile Number
                        </label>
                        <Input
                            value={mobile}
                            onChange={(e) => setMobile(e.target.value)}
                            placeholder="Mobile Number"
                        />
                    </div>

                    <div className="pt-2">
                        <Button
                            onClick={handleContinue}
                            disabled={loading}
                            loading={loading}
                        >
                            Continue
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LandingPage;