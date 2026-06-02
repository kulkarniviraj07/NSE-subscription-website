import React from "react";
import { Link } from "react-router-dom";
import Button from "../../components/ui/Button";

/**
 * High-fidelity branded 404 Not Found Page.
 */
export function NotFound() {
    return (
        <div className="min-h-screen bg-brand-navy flex items-center justify-center px-4 relative overflow-hidden font-sans">
            {/* Ambient background glows */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-brand-cyan/5 rounded-full blur-3xl pointer-events-none -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-brand-cyan/5 rounded-full blur-3xl pointer-events-none translate-x-1/2 translate-y-1/2" />

            <div className="w-full max-w-md bg-brand-dark/40 backdrop-blur-md rounded-3xl border border-brand-border p-8 sm:p-10 shadow-2xl relative z-10 text-center flex flex-col items-center">
                {/* 404 Visual Icon */}
                <div className="w-16 h-16 bg-[#151921] border border-brand-cyan/20 rounded-2xl flex items-center justify-center text-brand-cyan mb-6 shadow-inner glow-cyan">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                </div>

                <span className="text-[10px] font-extrabold text-brand-cyan uppercase tracking-widest bg-brand-navy px-3 py-1 rounded-full border border-brand-border">
                    ERROR 404
                </span>

                <h1 className="text-3xl font-extrabold text-brand-light mt-4 tracking-tight">
                    Page Not Found
                </h1>

                <p className="text-brand-slate text-sm mt-3 mb-8 leading-relaxed">
                    The URL you requested could not be resolved. Please confirm the link address or return to the safe dashboard panel.
                </p>

                <Link to="/dashboard" className="w-full">
                    <Button variant="primary" className="w-full">
                        Back to Dashboard
                    </Button>
                </Link>
            </div>
        </div>
    );
}

export default NotFound;
