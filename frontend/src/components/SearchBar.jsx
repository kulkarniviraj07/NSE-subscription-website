function SearchBar({
    value,
    onChange,
    ...props
}) {
    return (
        <div className="relative w-full mb-6">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg
                    className="h-5 w-5 text-[#6B7280]"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                </svg>
            </div>
            <input
                value={value}
                onChange={onChange}
                placeholder="Search by company name or symbol..."
                className="
                    w-full
                    h-14
                    pl-11
                    pr-4
                    bg-[#151921]
                    border
                    border-[#222A38]
                    rounded-2xl
                    text-[#E3E5EA]
                    placeholder-[#6B7280]
                    font-medium
                    text-base
                    transition-all
                    duration-200
                    focus:outline-none
                    focus:border-[#33D097]
                    focus:ring-2
                    focus:ring-[#33D097]/20
                    hover:border-[#222A38]/80
                    shadow-sm
                "
                {...props}
            />
        </div>
    );
}

export default SearchBar;