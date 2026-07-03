import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";
import { MarketChartBackground } from "../../components/common/MarketChartBackground";

/**
 * One-time screen shown to brand-new users right after their first
 * successful login/registration (i.e. the mobile number did not already
 * exist in our database). It asks them to message the alerts bot on
 * WhatsApp so they can start receiving announcement alerts.
 *
 * Gate behaviour: the "Continue to Dashboard" action only appears after
 * the user has clicked the WhatsApp button — there is no way to skip
 * straight past this screen.
 *
 * This page is purely informational/navigational — it does not read or
 * write any user data, so it is safe to show to anyone who lands on it.
 */
const WHATSAPP_BOT_NUMBER = import.meta.env.VITE_WHATSAPP_BOT_NUMBER || "";
const PREFILLED_MESSAGE = "Hi";

function WhatsAppWelcome() {
    const navigate = useNavigate();
    const [hasClicked, setHasClicked] = useState(false);

    const whatsappUrl = `https://wa.me/${WHATSAPP_BOT_NUMBER}?text=${encodeURIComponent(
        PREFILLED_MESSAGE
    )}`;

    const handleSendHi = () => {
        window.open(whatsappUrl, "_blank", "noopener,noreferrer");
        setHasClicked(true);
    };

    return (
        <div className="min-h-screen bg-[#0C0E14] flex items-center justify-center px-4 relative overflow-hidden">
            <MarketChartBackground />

            {/* Decorative ambient background */}
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#33D097]/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#33D097]/5 rounded-full blur-3xl pointer-events-none" />

            <div className="w-full max-w-md bg-[#151921] rounded-[32px] shadow-xl shadow-[#0C0E14]/50 border border-[#222A38] p-8 sm:p-10 text-center relative z-10">
                <div className="flex flex-col items-center">
                    {/* WhatsApp icon */}
                    <div className="w-16 h-16 bg-[#0C0E14] border border-[#222A38] rounded-2xl flex items-center justify-center mb-6">
                        <svg
                            className="w-8 h-8 text-[#33D097]"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                        >
                            <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2m0 1.67a8.2 8.2 0 0 1 5.83 2.42 8.2 8.2 0 0 1 2.41 5.82c0 4.55-3.7 8.24-8.25 8.24a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.18 8.18 0 0 1-1.25-4.38c0-4.55 3.7-8.24 8.24-8.24m-4.65 4.75c-.16 0-.43.06-.66.31-.22.25-.86.84-.86 2.05 0 1.21.88 2.38 1 2.54.12.17 1.72 2.72 4.29 3.7 2.12.82 2.55.66 3.01.61.46-.04 1.48-.6 1.69-1.19.21-.58.21-1.08.15-1.19-.06-.1-.23-.16-.48-.29-.25-.12-1.48-.73-1.71-.81-.23-.08-.4-.12-.56.13-.17.25-.65.81-.79.98-.15.16-.29.19-.54.06-.25-.12-1.04-.38-1.98-1.22-.73-.65-1.23-1.46-1.37-1.71-.15-.25-.02-.38.11-.51.11-.11.25-.29.37-.44.12-.14.16-.25.24-.4.08-.17.04-.31-.02-.44-.06-.12-.56-1.36-.78-1.85-.2-.48-.4-.42-.56-.42h-.48" />
                        </svg>
                    </div>

                    <h1 className="text-2xl sm:text-3xl font-extrabold text-[#E3E5EA] tracking-tight">
                        One last step
                    </h1>

                    <p className="text-[#9298A0] text-[15px] mt-3 leading-relaxed max-w-xs mx-auto">
                        To start getting Alerts, send a{" "}
                        <span className="font-bold text-[#E3E5EA]">
                            "Hi"
                        </span>{" "}
                        on WhatsApp.
                    </p>

                    <div className="mt-8 w-full space-y-3">
                        <Button onClick={handleSendHi} className="w-full">
                            Send "Hi" on WhatsApp
                        </Button>

                        {hasClicked && (
                            <Button
                                onClick={() => navigate("/dashboard")}
                                variant="outline"
                                className="w-full animate-fade-in"
                            >
                                Continue to Dashboard
                            </Button>
                        )}
                    </div>

                    {!hasClicked && (
                        <p className="text-[#646E7E] text-xs mt-5">
                            Tap the button above — it opens WhatsApp with the
                            message ready to send.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default WhatsAppWelcome;
