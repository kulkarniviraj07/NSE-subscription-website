import React from "react";
import Button from "../ui/Button";

/**
 * Standard error display page for unexpected route breaks or failed API hooks.
 */
export function ErrorPage({
    title = "Something went wrong",
    message = "An error occurred while loading this page. Please try refreshing or check your connection.",
    onRetry,
    goBack = true,
}) {
    return (
        <div className="min-h-[60vh] flex items-center justify-center p-6">
            <div className="w-full max-w-md bg-white rounded-3xl border border-slate-100 shadow-xl p-8 text-center flex flex-col items-center">
                <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center text-red-500 mb-6 shadow-inner">
                    <svg
                        className="w-8 h-8"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                    </svg>
                </div>
                
                <h2 className="text-2xl font-extrabold text-brand-navy tracking-tight">
                    {title}
                </h2>
                
                <p className="text-slate-500 text-sm mt-3 mb-8 leading-relaxed">
                    {message}
                </p>
                
                <div className="w-full flex flex-col gap-3">
                    {onRetry && (
                        <Button onClick={onRetry} variant="primary">
                            Try Again
                        </Button>
                    )}
                    
                    {goBack && (
                        <Button
                            onClick={() => (window.location.href = "/dashboard")}
                            variant="secondary"
                        >
                            Return to Dashboard
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ErrorPage;
