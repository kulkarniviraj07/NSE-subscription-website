import React from "react";

/**
 * Standard data-empty visualizer styled with the PureFrames design rules.
 */
export function EmptyState({
    title = "No data available",
    message = "There are no records matching your request or selection. Add items or modify filters to see content.",
    action,
    icon,
}) {
    return (
        <div className="w-full flex flex-col items-center text-center p-8 bg-brand-bg rounded-2xl border border-dashed border-slate-200">
            <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-slate-400 mb-4 shadow-sm">
                {icon || (
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0a2 2 0 01-2 2H6a2 2 0 01-2-2m16 0V9a2 2 0 00-2-2H6a2 2 0 00-2 2v2m16 4h-3.88l-.512-2H8.392l-.512 2H4"
                        />
                    </svg>
                )}
            </div>
            
            <h3 className="text-base font-bold text-brand-navy">
                {title}
            </h3>
            
            <p className="text-slate-400 text-xs mt-1.5 max-w-sm leading-relaxed">
                {message}
            </p>
            
            {action && (
                <div className="mt-5">
                    {action}
                </div>
            )}
        </div>
    );
}

export default EmptyState;
