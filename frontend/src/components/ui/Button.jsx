import React from "react";

/**
 * Premium reusable button styled with the PureFrames color scheme.
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
        primary: "bg-brand-cyan hover:bg-cyan-500 active:bg-cyan-600 text-brand-navy shadow-lg shadow-cyan-500/10 hover:shadow-cyan-500/20 focus:ring-4 focus:ring-cyan-100",
        secondary: "bg-brand-slate hover:bg-slate-700 text-white shadow-md focus:ring-4 focus:ring-slate-800",
        outline: "bg-transparent border border-brand-light text-brand-slate hover:bg-brand-bg focus:ring-4 focus:ring-slate-100",
        dark: "bg-brand-navy hover:bg-slate-900 text-white focus:ring-4 focus:ring-slate-800",
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
