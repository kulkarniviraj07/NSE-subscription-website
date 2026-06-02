import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { verifyOtp, sendOtp } from "../services/authApi";

import Input from "../components/Input";
import Button from "../components/Button";

function OtpPage() {
    const navigate = useNavigate();

    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);
    const [resending, setResending] = useState(false);
    const [resendMessage, setResendMessage] = useState("");

    const mobileNumber = localStorage.getItem("mobile") || "";

    async function handleVerify() {
        try {
            setLoading(true);

            const payload = {
                name: localStorage.getItem("name"),
                mobile: localStorage.getItem("mobile"),
                otp
            };

            console.log("VERIFY PAYLOAD:", payload);

            const result = await verifyOtp(payload);

            console.log("VERIFY RESPONSE:", result);

            if (result.token) {
                localStorage.setItem("token", result.token);
            }

            navigate("/plans");
        }
        catch (err) {
            console.error("OTP VERIFY ERROR:", err);
            alert(
                err?.response?.data?.message ||
                "OTP verification failed"
            );
        }
        finally {
            setLoading(false);
        }
    }

    async function handleResend() {
        try {
            setResending(true);
            setResendMessage("");
            
            const name = localStorage.getItem("name");
            const mobile = localStorage.getItem("mobile");

            await sendOtp({ name, mobile });
            setResendMessage("OTP sent successfully!");
            setTimeout(() => setResendMessage(""), 4000);
        }
        catch (err) {
            console.error("OTP RESEND ERROR:", err);
            alert(
                err?.response?.data?.message ||
                "Failed to resend OTP"
            );
        }
        finally {
            setResending(false);
        }
    }

    return (
        <div className="min-h-screen bg-[#0C0E14] flex items-center justify-center px-4 relative overflow-hidden">
            {/* Decorative ambient background */}
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#33D097]/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#33D097]/5 rounded-full blur-3xl pointer-events-none" />

            <div className="w-full max-w-md bg-[#151921] rounded-[32px] shadow-xl shadow-[#0C0E14]/50 border border-[#222A38] p-8 sm:p-10 relative z-10">
                
                {/* Visual Shield Icon */}
                <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-[#0C0E14] border border-[#222A38] rounded-2xl flex items-center justify-center mb-6">
                        <svg 
                            className="w-8 h-8 text-[#33D097]" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor" 
                            strokeWidth="2"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" 
                            />
                        </svg>
                    </div>

                    <h1 className="text-3xl font-extrabold text-[#E3E5EA] tracking-tight">
                        Verify Mobile Number
                    </h1>

                    <p className="text-[#9298A0] text-[15px] mt-2 leading-relaxed">
                        Enter the OTP sent to your mobile
                        {mobileNumber && <span className="block font-bold text-[#E3E5EA] mt-1">{mobileNumber}</span>}
                    </p>
                </div>

                <div className="mt-8 space-y-4">
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-[#9298A0] uppercase tracking-wider pl-1">
                            One-Time Password
                        </label>
                        <Input
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            placeholder="Enter OTP"
                            type="text"
                            maxLength="6"
                        />
                    </div>

                    <div className="pt-2">
                        <Button
                            onClick={handleVerify}
                            disabled={loading}
                            loading={loading}
                        >
                            Verify OTP
                        </Button>
                    </div>

                    <div className="flex flex-col items-center justify-center pt-2">
                        <button
                            type="button"
                            onClick={handleResend}
                            disabled={resending}
                            className="text-sm font-semibold text-[#33D097] hover:text-[#3BE6A7] disabled:opacity-50 transition-colors"
                        >
                            {resending ? "Resending..." : "Resend OTP"}
                        </button>
                        
                        {resendMessage && (
                            <p className="text-xs font-semibold text-[#33D097] mt-2 bg-[#151921] border border-[#222A38] px-3 py-1 rounded-full">
                                {resendMessage}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OtpPage;