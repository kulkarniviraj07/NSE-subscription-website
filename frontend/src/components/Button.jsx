function Button({
    children,
    onClick,
    disabled = false,
    loading = false,
    ...props
}) {
    return (
        <button
            onClick={onClick}
            disabled={disabled || loading}
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
                flex
                items-center
                justify-center
                gap-2
                transition-all
                duration-200
                focus:outline-none
                focus:ring-2
                focus:ring-[#33D097]/25
                disabled:opacity-60
                disabled:cursor-not-allowed
                disabled:hover:bg-[#33D097]
                shadow-md
                hover:shadow-lg
                active:scale-[0.99]
            "
            {...props}
        >
            {loading && (
                <svg 
                    className="animate-spin h-5 w-5 text-[#0C0E14]" 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24"
                >
                    <circle 
                        className="opacity-25" 
                        cx="12" 
                        cy="12" 
                        r="10" 
                        stroke="currentColor" 
                        strokeWidth="4"
                    />
                    <path 
                        className="opacity-75" 
                        fill="currentColor" 
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                </svg>
            )}
            <span>{children}</span>
        </button>
    );
}

export default Button;