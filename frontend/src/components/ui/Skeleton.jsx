import React from "react";

/**
 * Premium skeleton loaders with smooth pulse animations.
 */
export function Skeleton({ className = "", variant = "text" }) {
    const base = "bg-slate-200 animate-pulse rounded-lg";
    
    const variants = {
        text: "h-4 w-full",
        title: "h-6 w-3/4",
        avatar: "h-10 w-10 rounded-full",
        button: "h-11 w-full rounded-xl",
        card: "h-24 w-full rounded-2xl",
        rectangle: "h-32 w-full",
    };

    return (
        <div className={`${base} ${variants[variant] || ""} ${className}`} />
    );
}

/**
 * Displays a vertical stack of skeleton loaders to simulate list items.
 */
export function ListSkeleton({ count = 3, cardVariant = "card" }) {
    return (
        <div className="space-y-4 w-full">
            {Array.from({ length: count }).map((_, idx) => (
                <Skeleton key={idx} variant={cardVariant} />
            ))}
        </div>
    );
}

export default Skeleton;
