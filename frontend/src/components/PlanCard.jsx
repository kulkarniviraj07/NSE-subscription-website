function PlanCard({
    title,
    price,
    limit,
    onSelect
}) {
    const isPremium = title?.toUpperCase() === "PREMIUM";

    return (
        <div
            className={`
                relative
                bg-white
                rounded-3xl
                p-8
                text-center
                transition-all
                duration-300
                flex
                flex-col
                justify-between
                min-h-[360px]
                ${
                    isPremium
                        ? "border-2 border-[#2563EB] shadow-xl shadow-blue-50/50 scale-[1.02] md:scale-[1.04]"
                        : "border border-slate-200 shadow-md shadow-slate-100/50"
                }
            `}
        >
            {isPremium && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#2563EB] text-white text-xs font-bold px-4 py-1.5 rounded-full tracking-wider uppercase shadow-sm">
                    Most Popular
                </span>
            )}

            <div className="pt-2">
                <h2 className="text-lg font-bold text-[#0F172A] tracking-tight uppercase">
                    {title}
                </h2>
                
                <div className="mt-5 flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-extrabold text-[#0F172A]">
                        ₹{price}
                    </span>
                    {isPremium && (
                        <span className="text-[#64748B] font-semibold text-sm">
                            /month
                        </span>
                    )}
                </div>

                <div className="mt-6 py-4 px-3 bg-slate-50 rounded-2xl flex flex-col gap-2">
                    <div className="flex items-center justify-center gap-2 text-[#0F172A]">
                        <svg className="w-5 h-5 text-[#2563EB] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-sm font-semibold">
                            Track up to {limit} companies
                        </span>
                    </div>
                </div>
            </div>

            <div className="mt-8">
                <button
                    onClick={onSelect}
                    className={`
                        w-full
                        h-13
                        py-3.5
                        px-6
                        rounded-xl
                        font-bold
                        text-sm
                        transition-all
                        duration-200
                        focus:outline-none
                        active:scale-[0.98]
                        ${
                            isPremium
                                ? "bg-[#2563EB] text-white hover:bg-[#1D4ED8] hover:shadow-lg hover:shadow-blue-200/40 focus:ring-4 focus:ring-blue-100"
                                : "bg-slate-100 text-slate-800 hover:bg-slate-200 focus:ring-4 focus:ring-slate-100"
                        }
                    `}
                >
                    {isPremium ? "Choose Premium" : "Choose Free"}
                </button>
            </div>
        </div>
    );
}

export default PlanCard;