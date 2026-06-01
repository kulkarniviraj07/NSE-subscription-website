function SearchBar({
    value,
    onChange,
    ...props
}) {
    return (
        <div className="relative w-full mb-6">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg
                    className="h-5 w-5 text-slate-400"
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
                    bg-white
                    border
                    border-slate-200
                    rounded-2xl
                    text-slate-900
                    placeholder-slate-400
                    font-medium
                    text-base
                    transition-all
                    duration-200
                    focus:outline-none
                    focus:border-[#2563EB]
                    focus:ring-4
                    focus:ring-blue-50
                    hover:border-slate-300
                    shadow-sm
                "
                {...props}
            />
        </div>
    );
}

export default SearchBar;