import { useNavigate } from "react-router-dom";

function VerifyPage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-4 relative overflow-hidden">
            {/* Ambient background decoration */}
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="w-full max-w-md bg-white rounded-[32px] shadow-xl shadow-slate-100/50 border border-slate-100 p-8 sm:p-10 text-center relative z-10">
                
                {/* Large Green Checkmark Success SVG */}
                <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center border border-green-100/50 shadow-sm shadow-green-100">
                        <svg 
                            className="w-10 h-10 text-[#16A34A]" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor" 
                            strokeWidth="3"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                d="M5 13l4 4L19 7" 
                            />
                        </svg>
                    </div>
                </div>

                <h1 className="text-3xl font-extrabold text-[#0F172A] tracking-tight">
                    Setup Complete
                </h1>

                <p className="text-[#64748B] text-base font-semibold mt-3 leading-relaxed max-w-xs mx-auto">
                    You will now receive company updates.
                </p>

                <div className="mt-8">
                    <button 
                        onClick={() => navigate("/")}
                        className="
                            w-full 
                            h-14 
                            bg-[#16A34A] 
                            hover:bg-[#15803D] 
                            active:bg-[#14532D]
                            text-white 
                            font-semibold 
                            rounded-xl 
                            shadow-sm 
                            hover:shadow-md
                            transition-all 
                            duration-200
                            focus:outline-none
                            focus:ring-4 
                            focus:ring-green-100
                            flex
                            items-center
                            justify-center
                            active:scale-[0.99]
                        "
                    >
                        Finish
                    </button>
                </div>
            </div>
        </div>
    );
}

export default VerifyPage;