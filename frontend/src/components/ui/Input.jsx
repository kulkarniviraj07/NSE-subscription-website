import React from "react";

/**
 * Premium reusable input field with responsive states and custom error styling.
 */
export function Input({
    label,
    value,
    onChange,
    placeholder,
    type = "text",
    error = "",
    className = "",
    icon,
    ...props
}) {
    return (
        <div className={`w-full flex flex-col gap-1.5 ${className}`}>
            {label && (
                <label className="text-[13px] font-bold text-brand-slate uppercase tracking-wider pl-1">
                    {label}
                </label>
            )}
            
            <div className="relative w-full">
                {icon && (
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-brand-slate">
                        {icon}
                    </div>
                )}
                
                <input
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    type={type}
                    className={`
                        w-full
                        h-12
                        ${icon ? "pl-11" : "pl-4"}
                        pr-4
                        bg-brand-dark
                        border
                        ${error ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : "border-brand-border focus:border-brand-cyan focus:ring-brand-cyan/20"}
                        rounded-xl
                        text-brand-light
                        placeholder-brand-textMuted
                        font-medium
                        text-sm
                        transition-all
                        duration-200
                        focus:outline-none
                        focus:ring-2
                        hover:border-brand-border/80
                    `}
                    {...props}
                />
            </div>
            
            {error && (
                <span className="text-xs font-semibold text-red-500 pl-1 mt-0.5">
                    {error}
                </span>
            )}
        </div>
    );
}

export default Input;
