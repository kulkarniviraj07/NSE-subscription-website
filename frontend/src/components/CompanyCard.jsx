function CompanyCard({
    company,
    selected,
    onToggle
}) {
    return (
        <div
            onClick={onToggle}
            className={`
                p-5
                border
                rounded-2xl
                cursor-pointer
                flex
                justify-between
                items-center
                transition-all
                duration-200
                select-none
                ${
                    selected
                        ? "border-[#2563EB] bg-blue-50/30 shadow-sm"
                        : "border-slate-100 bg-white hover:bg-slate-50/60 hover:border-slate-200"
                }
            `}
        >
            <div className="flex-1 min-w-0 pr-4">
                <p className="font-semibold text-[#0F172A] truncate text-[15px] sm:text-base">
                    {company.company_name}
                </p>
                <p className="text-xs sm:text-sm font-semibold text-[#64748B] mt-1 uppercase tracking-wider">
                    {company.symbol}
                </p>
            </div>
            
            <div className="flex items-center justify-center flex-shrink-0">
                {/* Visual custom checkbox */}
                <div
                    className={`
                        w-6
                        h-6
                        rounded-lg
                        border-2
                        flex
                        items-center
                        justify-center
                        transition-all
                        duration-200
                        ${
                            selected
                                ? "bg-[#2563EB] border-[#2563EB] text-white shadow-sm"
                                : "border-slate-300 bg-white"
                        }
                    `}
                >
                    {selected && (
                        <svg
                            className="w-4 h-4 stroke-2"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                    )}
                </div>
                
                {/* Hidden input for DOM/accessibility compatibility */}
                <input
                    type="checkbox"
                    checked={selected}
                    readOnly
                    className="sr-only"
                />
            </div>
        </div>
    );
}

export default CompanyCard;