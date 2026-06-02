import { useNavigate } from "react-router-dom";

function VerifyPage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#0C0E14] flex items-center justify-center px-4 relative overflow-hidden">
            {/* Decorative background grids */}
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#33D097]/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#33D097]/5 rounded-full blur-3xl pointer-events-none" />

            <div className="w-full max-w-md bg-[#151921] rounded-[32px] shadow-xl shadow-[#0C0E14]/50 border border-[#222A38] p-8 sm:p-10 text-center relative z-10">
                
                <div className="flex flex-col items-center">
                    <div className="w-20 h-20 bg-[#0C0E14] border border-[#222A38] rounded-2xl flex items-center justify-center mb-6">
                        <svg 
                            className="w-10 h-10 text-[#33D097]" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor" 
                            strokeWidth="2.5"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
                            />
                        </svg>
                    </div>

                    <h1 className="text-3xl font-extrabold text-[#E3E5EA] tracking-tight">
                        Payment Verified
                    </h1>

                    <p className="text-[#9298A0] text-base font-semibold mt-3 leading-relaxed max-w-xs mx-auto">
                        Your premium access has been activated successfully.
                    </p>

                    <div className="mt-8 w-full">
                        <button
                            onClick={() => navigate("/companies")}
                            className="
                                w-full
                                h-14
                                px-6
                                bg-[#33D097] 
                                hover:bg-[#3BE6A7] 
                                active:scale-[0.98]
                                text-[#0C0E14]
                                rounded-xl
                                font-semibold
                                text-base
                                transition-all
                                duration-200
                                shadow-md
                                hover:shadow-lg
                            "
                        >
                            Continue
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VerifyPage;