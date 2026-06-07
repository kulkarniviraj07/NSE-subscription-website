import React from "react";

/**
 * Premium glassmorphic loading visualizer.
 * Supports inline centering or absolute backdrop overlays.
 */
export function Loader({ fullScreen = false }) {
    if (fullScreen) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-brand-navy/60 backdrop-blur-md">
                <div className="bg-brand-dark/90 p-8 rounded-3xl shadow-2xl border border-brand-border flex flex-col items-center gap-4 animate-fade-in">
                    <div className="relative flex items-center justify-center">
                        <div className="h-14 w-14 rounded-full border-4 border-brand-border/40" />
                        <div className="absolute h-14 w-14 rounded-full border-4 border-t-brand-cyan border-r-transparent border-b-transparent border-l-transparent animate-spin" />
                    </div>
                    <span className="text-xs font-bold text-brand-light tracking-widest uppercase">
                        Loading EquityAlerts
                    </span>
                </div>
            </div>
        );
    }

    return (
        <div className="flex justify-center items-center py-8">
            <div className="relative">
                <div className="h-10 w-10 rounded-full border-4 border-brand-border/40" />
                <div className="absolute top-0 left-0 h-10 w-10 rounded-full border-4 border-t-brand-cyan border-r-transparent border-b-transparent border-l-transparent animate-spin" />
            </div>
        </div>
    );
}

export default Loader;
