import React from "react";

/**
 * Premium reusable button styled with the EquityAlerts color scheme.
 */
export function Button({
    children,
    onClick,
    disabled = false,
    loading = false,
    type = "button",
    variant = "primary", // primary, secondary, danger, outline
    className = "",
    ...props
}) {
    // Elegant classes based on variant choices
    const baseStyles = "relative h-12 px-6 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-200 focus:outline-none disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.98]";
    
    const variants = {
        primary: "bg-brand-cyan hover:bg-[#3BE6A7] text-brand-navy shadow-lg shadow-brand-cyan/10 focus:ring-2 focus:ring-brand-cyan/20 active:scale-[0.95]",
        secondary: "bg-transparent border border-brand-border text-brand-light hover:bg-brand-dark focus:ring-2 focus:ring-brand-border/20 active:scale-[0.95]",
        outline: "bg-transparent border border-brand-border text-brand-light hover:bg-brand-dark focus:ring-2 focus:ring-brand-border/20 active:scale-[0.95]",
        dark: "bg-brand-navy border border-brand-border text-brand-light hover:bg-brand-dark focus:ring-2 focus:ring-brand-border/20 active:scale-[0.95]",
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled || loading}
            className={`${baseStyles} ${variants[variant] || variants.primary} ${className}`}
            {...props}
        >
            {loading && (
                <svg
                    className="animate-spin h-5 w-5 text-current"
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
