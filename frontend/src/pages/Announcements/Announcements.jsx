import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import useApp from "../../hooks/useApp";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import EmptyState from "../../components/common/EmptyState";
import { ListSkeleton } from "../../components/ui/Skeleton";

/**
 * Clean SaaS Announcements Feed Page.
 */
export function Announcements() {
    const { announcements, selectedCompanies, loading } = useApp();
    const navigate = useNavigate();

    // Inputs & Filtering states
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("All");
    const [selectedAnnouncement, setSelectedAnnouncement] = useState(null); // Active Modal Announcement

    // Tab Categories
    const categories = ["All", "Financials", "Corporate Action", "Regulatory", "Business Updates"];

    // Dynamic Filter
    const filteredAnnouncements = useMemo(() => {
        return announcements.filter((ann) => {
            const companyName = (ann.companyName || ann.company_name || "").toLowerCase();
            const companyCode = (ann.companyCode || ann.symbol || "").toLowerCase();
            const title = (ann.title || "").toLowerCase();
            const query = searchQuery.toLowerCase();

            const matchesSearch =
                companyName.includes(query) ||
                companyCode.includes(query) ||
                title.includes(query);
            const matchesCategory =
                activeCategory === "All" || ann.category === activeCategory;

            return matchesSearch && matchesCategory;
        });
    }, [announcements, searchQuery, activeCategory]);

    return (
        <div className="space-y-6 pb-8 font-sans bg-transparent text-brand-slate">
            {/* Conditional Redirect when no companies are selected */}
            {selectedCompanies.length === 0 ? (
                <EmptyState
                    title="No companies tracked"
                    message="You haven't added any company to your watchlist yet. Follow stocks in the Company Selection portal to unlock filings logs."
                    action={
                        <Button 
                            onClick={() => navigate("/companies")} 
                            variant="primary"
                            className="!bg-brand-cyan hover:!bg-[#3BE6A7] !text-brand-navy !h-11 !rounded-xl !px-6 font-semibold"
                        >
                            Track Companies Now
                        </Button>
                    }
                />
            ) : (
                <>
                    {/* Search experience */}
                    <div className="space-y-1 text-left">
                        <Input
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search updates by keyword or symbol..."
                            icon={
                                <svg className="w-5 h-5 text-brand-slate" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            }
                        />
                    </div>

                    {/* Horizontal scrollable category tab filters */}
                    <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4 md:mx-0 md:px-0 custom-scrollbar">
                        {categories.map((cat, idx) => (
                            <button
                                key={idx}
                                onClick={() => setActiveCategory(cat)}
                                className={`
                                    px-4 h-9 rounded-full text-xs font-semibold shrink-0 transition duration-150 focus:outline-none
                                    ${activeCategory === cat
                                        ? "bg-brand-cyan text-brand-navy shadow-sm"
                                        : "bg-[#151921] text-brand-slate border border-[#222A38] hover:bg-[#0C0E14] hover:text-brand-light"}
                                `}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Feed List */}
                    <div className="space-y-3.5 text-left">
                        <div className="flex items-baseline justify-between pl-1">
                            <h4 className="text-xs font-bold text-[#6B7280] uppercase tracking-wider">
                                {activeCategory === "All" ? "All Updates" : `${activeCategory} Updates`}
                            </h4>
                            <span className="text-[10px] text-[#6B7280] font-semibold uppercase">
                                {filteredAnnouncements.length} records found
                            </span>
                        </div>

                        {loading ? (
                            <ListSkeleton count={4} />
                        ) : filteredAnnouncements.length === 0 ? (
                            <EmptyState
                                title="No filings found"
                                message={`No disclosures matching "${searchQuery}" in category ${activeCategory} could be found.`}
                            />
                        ) : (
                            <div className="space-y-4">
                                {filteredAnnouncements.map((ann) => (
                                    <div
                                        key={ann.id}
                                        className="p-5 bg-[#151921] border border-[#222A38] rounded-2xl shadow-sm hover:shadow-lg hover:border-[#222A38]/80 transition duration-150 flex flex-col justify-between"
                                    >
                                        <div className="space-y-3">
                                            {/* Stock label Header */}
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-xs font-bold text-brand-cyan bg-brand-dark border border-brand-border px-2.5 py-1 rounded-lg">
                                                        {ann.companyCode}
                                                    </span>
                                                    <span className="text-[10px] text-[#6B7280] font-bold uppercase tracking-wider">
                                                        {ann.companyName}
                                                    </span>
                                                </div>

                                                <span className="text-[9px] font-bold text-brand-cyan bg-[#151921] px-2 py-0.5 rounded-full border border-brand-border uppercase tracking-wide">
                                                    {ann.category}
                                                </span>
                                            </div>

                                            {/* File disclosure title */}
                                            <h3 className="text-sm font-bold text-brand-light leading-snug">
                                                {ann.title}
                                            </h3>

                                            <p className="text-brand-slate text-xs truncate">
                                                {ann.desc}
                                            </p>
                                        </div>

                                        {/* Card footer details & metadata link */}
                                        <div className="flex items-center justify-between mt-4 pt-3.5 border-t border-brand-border">
                                            <span className="text-[10px] font-semibold text-[#6B7280]">
                                                {ann.timestamp}
                                            </span>

                                            <button
                                                onClick={() => setSelectedAnnouncement(ann)}
                                                className="text-xs font-bold text-brand-cyan hover:text-[#3BE6A7] hover:underline flex items-center gap-1.5 focus:outline-none"
                                            >
                                                View Details
                                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </>
            )}

            {/* Detailed Modal view */}
            {selectedAnnouncement && (
                <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-[#0C0E14]/60 backdrop-blur-sm animate-fade-in">
                    <div
                        className="fixed inset-0"
                        onClick={() => setSelectedAnnouncement(null)}
                    />

                    {/* Modal container */}
                    <div className="w-full sm:max-w-xl bg-[#151921] rounded-t-2xl sm:rounded-2xl border border-[#222A38] shadow-2xl z-10 flex flex-col max-h-[85vh] animate-slide-up relative overflow-hidden text-left">

                        {/* Header Details */}
                        <div className="p-5 border-b border-brand-border flex items-center justify-between">
                            <div className="space-y-0.5">
                                <span className="text-[10px] font-bold text-brand-cyan uppercase tracking-wider block">
                                    Filing Update Details
                                </span>
                                <h3 className="text-base font-bold text-brand-light flex items-center gap-2">
                                    <span className="bg-brand-dark text-brand-cyan border border-brand-border px-2 py-0.5 rounded text-xs">
                                        {selectedAnnouncement.companyCode}
                                    </span>
                                    {selectedAnnouncement.companyName}
                                </h3>
                            </div>

                            <button
                                onClick={() => setSelectedAnnouncement(null)}
                                className="p-2 rounded-full hover:bg-brand-navy text-brand-slate hover:text-brand-light transition"
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Modal Body scrollable panel */}
                        <div className="p-6 overflow-y-auto space-y-5 custom-scrollbar text-left flex-1">
                            <div className="flex items-center justify-between text-xs border-b border-brand-border pb-3">
                                <div>
                                    <span className="block text-brand-textMuted font-medium">Category</span>
                                    <span className="font-bold text-brand-light uppercase">{selectedAnnouncement.category}</span>
                                </div>
                                <div className="text-right">
                                    <span className="block text-brand-textMuted font-medium">Filing Time</span>
                                    <span className="font-bold text-brand-slate">{selectedAnnouncement.timestamp}</span>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <h4 className="text-xs font-bold text-brand-textMuted uppercase tracking-wider">
                                    Subject:
                                </h4>
                                <h2 className="text-sm font-bold text-brand-light leading-relaxed bg-[#0C0E14] p-4 border border-[#222A38] rounded-xl">
                                    {selectedAnnouncement.title}
                                </h2>
                            </div>

                            <div className="space-y-2 text-xs text-brand-slate leading-relaxed">
                                <h4 className="text-xs font-bold text-brand-textMuted uppercase tracking-wider">
                                    Document Disclosure Transcript:
                                </h4>
                                <p className="bg-[#0C0E14] border border-[#222A38] p-4 rounded-xl text-brand-slate">
                                    {selectedAnnouncement.desc}
                                    <br /><br />
                                    This statement is delivered in compliance with disclosure requirements. Certified documents have been registered under digital signing vaults.
                                </p>
                            </div>

                            {/* Standard security compliance tags */}
                            <div className="p-3 bg-[#0C0E14] border border-[#222A38] text-brand-slate rounded-xl text-[10px] font-semibold flex items-center gap-2">
                                <svg className="w-4 h-4 text-brand-slate shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                                Verified Information Source
                            </div>
                        </div>

                        {/* Modal Action CTA */}
                        <div className="p-5 border-t border-brand-border flex gap-3">
                            <Button
                                onClick={() => setSelectedAnnouncement(null)}
                                variant="secondary"
                                className="flex-1 !h-11 !rounded-xl !bg-transparent border border-brand-border !text-brand-light hover:!bg-brand-navy !font-semibold text-xs uppercase"
                            >
                                Close
                            </Button>

                            <Button
                                onClick={() => alert("PDF document download simulated successfully!")}
                                variant="primary"
                                className="flex-1 !h-11 !rounded-xl !bg-brand-cyan hover:!bg-[#3BE6A7] !text-brand-navy !font-semibold text-xs uppercase focus:!ring-brand-cyan/20"
                            >
                                Download PDF
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Announcements;
