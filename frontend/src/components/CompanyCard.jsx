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
                        ? "border-[#33D097] bg-[#151921] shadow-inner shadow-[#33D097]/5"
                        : "border-[#222A38] bg-[#151921] hover:bg-[#1a1f29] hover:border-[#222A38]/80"
                }
            `}
        >
            <div className="flex-1 min-w-0 pr-4">
                <p className="font-semibold text-[#E3E5EA] truncate text-[15px] sm:text-base">
                    {company.company_name}
                </p>
                <p className={`text-xs sm:text-sm font-bold mt-1 uppercase tracking-wider ${selected ? "text-[#33D097]" : "text-[#9298A0]"}`}>
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
                                ? "bg-[#33D097] border-[#33D097] text-[#0C0E14] shadow-sm"
                                : "border-[#222A38] bg-[#151921]"
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