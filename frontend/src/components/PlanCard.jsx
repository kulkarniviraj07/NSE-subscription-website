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
                bg-[#151921]
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
                        ? "border-2 border-[#33D097] shadow-xl shadow-[#33D097]/5 scale-[1.02] md:scale-[1.04]"
                        : "border border-[#222A38] shadow-md shadow-[#0C0E14]"
                }
            `}
        >
            {isPremium && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#33D097] text-[#0C0E14] text-xs font-bold px-4 py-1.5 rounded-full tracking-wider uppercase shadow-sm">
                    Most Popular
                </span>
            )}

            <div className="pt-2">
                <h2 className="text-lg font-bold text-[#E3E5EA] tracking-tight uppercase">
                    {title}
                </h2>
                
                <div className="mt-5 flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-extrabold text-[#E3E5EA]">
                        ₹{price}
                    </span>
                    {isPremium && (
                        <span className="text-[#9298A0] font-semibold text-sm">
                            /month
                        </span>
                    )}
                </div>

                <div className="mt-6 py-4 px-3 bg-[#0C0E14] border border-[#222A38] rounded-2xl flex flex-col gap-2">
                    <div className="flex items-center justify-center gap-2 text-[#E3E5EA]">
                        <svg className="w-5 h-5 text-[#33D097] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
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
                                ? "bg-[#33D097] text-[#0C0E14] hover:bg-[#3BE6A7] hover:shadow-lg hover:shadow-[#33D097]/20 focus:ring-2 focus:ring-[#33D097]/20"
                                : "bg-transparent border border-[#222A38] text-[#E3E5EA] hover:bg-[#151921] focus:ring-2 focus:ring-[#222A38]"
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