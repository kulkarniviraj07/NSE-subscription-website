import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import useApp from "../../hooks/useApp";
import Input from "../../components/ui/Input";
import EmptyState from "../../components/common/EmptyState";
import { ListSkeleton } from "../../components/ui/Skeleton";

/**
 * Watchlist Builder — guided, first-timer-friendly company picker.
 *
 * UX goals:
 *  • Tell the user EXACTLY what to do (one tap = alerts on WhatsApp).
 *  • Show "Your watchlist" up top with removable chips + a live progress bar.
 *  • Make selected vs unselected unmistakable.
 *  • Everything saves instantly (no confusing "save" step) with smooth motion.
 */
export function CompanySelection() {
    const {
        allCompanies,
        selectedCompanies,
        currentSubscription,
        addTrackedCompany,
        removeTrackedCompany,
        loading
    } = useApp();

    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const [actionLoading, setActionLoading] = useState(null); // company id being toggled
    const [errorMessage, setErrorMessage] = useState("");

    const limit = currentSubscription ? currentSubscription.company_limit : 5;
    const selectedCount = selectedCompanies.length;
    const pct = limit > 0 ? Math.min(100, Math.round((selectedCount / limit) * 100)) : 0;
    const atLimit = selectedCount >= limit;
    const hasPlan = Boolean(currentSubscription);

    const selectedIds = useMemo(
        () => new Set(selectedCompanies.map((c) => c.id || c.company_id)),
        [selectedCompanies]
    );
    const isTracked = (id) => selectedIds.has(id);

    // Search the catalog; default to the whole list so a user can reach all symbols.
    const filteredCompanies = useMemo(() => {
        const query = searchQuery.trim().toLowerCase();
        if (!query) return allCompanies;
        return allCompanies.filter(
            (c) =>
                (c.company_name || "").toLowerCase().includes(query) ||
                (c.symbol || "").toLowerCase().includes(query)
        );
    }, [allCompanies, searchQuery]);

    const flash = (msg) => {
        setErrorMessage(msg);
        setTimeout(() => setErrorMessage(""), 4000);
    };

    const handleToggleCompany = async (company) => {
        const compId = company.id || company.company_id;
        if (actionLoading !== null) return; // block double taps

        setErrorMessage("");
        const tracked = isTracked(compId);

        if (!hasPlan) {
            flash("Activate a plan first to start building your watchlist.");
            return;
        }
        if (!tracked && atLimit) {
            flash(`You've hit your plan limit of ${limit} companies. Remove one to add another.`);
            return;
        }

        setActionLoading(compId);
        try {
            if (tracked) {
                await removeTrackedCompany(company);
            } else {
                await addTrackedCompany(company);
            }
        } catch (err) {
            flash(err.message || "Couldn't update your watchlist. Try again.");
        } finally {
            setActionLoading(null);
        }
    };

    return (
        <div className="relative space-y-6 pb-32 font-sans text-brand-slate">
            {/* ── Guided header ─────────────────────────────────────────── */}
            <header className="animate-fade-in-up space-y-3 mt-2">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#222A38] bg-[#10141E] px-3 py-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#33D097] pulse-dot" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#9298A0] font-mono">
                        Step 1 · Build your watchlist
                    </span>
                </div>

                <h2 className="text-[26px] sm:text-3xl font-extrabold tracking-tight text-[#E3E5EA] leading-tight">
                    Pick the companies you want <span className="grad-text">alerts</span> for
                </h2>

                <p className="text-sm leading-relaxed text-[#9298A0] max-w-xl">
                    Tap a company to add it. The moment it files an announcement on NSE or BSE,
                    you’ll get the PDF on <span className="font-semibold text-[#33D097]">WhatsApp</span> —
                    usually within a minute. Tap again to remove it. Changes save automatically.
                </p>
            </header>

            {/* ── No-plan CTA ───────────────────────────────────────────── */}
            {!loading && !hasPlan && (
                <div className="animate-fade-in-up rounded-2xl border border-[#33D097]/40 bg-[#10141E] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="text-left">
                        <p className="text-sm font-bold text-[#E3E5EA]">You don’t have an active plan yet</p>
                        <p className="text-xs text-[#9298A0] mt-0.5">Activate one to start adding companies — it takes a second.</p>
                    </div>
                    <button
                        onClick={() => navigate("/plans")}
                        className="shrink-0 bg-[#33D097] hover:bg-[#3BE6A7] text-[#07090F] rounded-xl py-2.5 px-5 font-bold text-sm transition active:scale-[0.97] shadow-glow"
                    >
                        Choose a plan
                    </button>
                </div>
            )}

            {/* ── Progress / live count ─────────────────────────────────── */}
            <div className="animate-fade-in-up rounded-2xl border border-[#222A38] bg-[#10141E] p-5 space-y-3" style={{ animationDelay: "60ms" }}>
                <div className="flex items-end justify-between">
                    <div className="text-left">
                        <span className="block text-[10px] font-bold uppercase tracking-wider text-[#646E7E] font-mono">
                            Your watchlist
                        </span>
                        <span className="text-2xl font-extrabold text-[#E3E5EA] font-mono">
                            {selectedCount}
                            <span className="text-[#2A3344] mx-1">/</span>
                            <span className="text-[#9298A0]">{limit}</span>
                        </span>
                    </div>
                    <span
                        className={`text-[10px] font-bold uppercase tracking-wider font-mono px-2.5 py-1 rounded-full border transition-colors ${
                            atLimit
                                ? "text-amber-300 border-amber-500/30 bg-amber-500/5"
                                : "text-[#33D097] border-[#33D097]/30 bg-[#33D097]/5"
                        }`}
                    >
                        {atLimit ? "Limit reached" : `${limit - selectedCount} slots left`}
                    </span>
                </div>

                <div className="h-2 w-full rounded-full bg-[#0B0E16] overflow-hidden border border-[#1A2230]">
                    <div
                        className="h-full rounded-full bg-brand-grad transition-[width] duration-500 ease-out"
                        style={{ width: `${pct}%` }}
                    />
                </div>
            </div>

            {/* ── Your watchlist chips ──────────────────────────────────── */}
            <section className="space-y-2.5 text-left">
                <h4 className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#646E7E] pl-1">
                    Tracking now
                </h4>

                {selectedCount === 0 ? (
                    <div className="rounded-2xl border border-dashed border-[#222A38] bg-[#0B0E16]/50 px-4 py-6 text-center">
                        <p className="text-sm text-[#9298A0]">
                            No companies yet — tap any below to start{" "}
                            <span className="inline-block animate-float">👇</span>
                        </p>
                    </div>
                ) : (
                    <div className="flex flex-wrap gap-2">
                        {selectedCompanies.map((company) => {
                            const compId = company.id || company.company_id;
                            const busy = actionLoading === compId;
                            return (
                                <button
                                    key={compId}
                                    onClick={() => handleToggleCompany(company)}
                                    disabled={busy}
                                    title={`Remove ${company.symbol}`}
                                    className="group animate-fade-in inline-flex items-center gap-2 rounded-full border border-[#33D097]/40 bg-[#33D097]/10 pl-3 pr-2 py-1.5 font-mono text-xs font-bold text-[#E3E5EA] transition hover:border-[#33D097] hover:bg-[#33D097]/15 active:scale-[0.97] disabled:opacity-50"
                                >
                                    <span>{company.symbol}</span>
                                    <span className="flex items-center justify-center w-4 h-4 rounded-full bg-[#0B0E16] text-[#9298A0] group-hover:text-[#33D097] transition-colors">
                                        {busy ? (
                                            <svg className="animate-spin w-3 h-3" viewBox="0 0 24 24" fill="none">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                            </svg>
                                        ) : (
                                            <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        )}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                )}
            </section>

            {/* ── Error toast ───────────────────────────────────────────── */}
            {errorMessage && (
                <div className="animate-fade-in p-3.5 bg-[#10141E] border border-red-900/50 text-red-400 rounded-xl text-xs font-semibold flex items-center gap-2.5 shadow-sm">
                    <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <span>{errorMessage}</span>
                </div>
            )}

            {/* ── Search ────────────────────────────────────────────────── */}
            <div className="text-left">
                <Input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search a company (e.g. INFY, TCS, Reliance)…"
                    icon={
                        <svg className="w-5 h-5 text-brand-slate" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    }
                />
            </div>

            {/* ── Catalog grid ──────────────────────────────────────────── */}
            <section className="space-y-3 text-left">
                <div className="flex items-baseline justify-between pl-1 font-mono text-[10px]">
                    <h4 className="font-bold text-[#646E7E] uppercase tracking-wider">
                        {searchQuery ? "Search results" : "All companies"}
                    </h4>
                    <span className="text-[#646E7E] font-semibold uppercase">
                        {filteredCompanies.length} listed
                    </span>
                </div>

                {loading ? (
                    <ListSkeleton count={6} />
                ) : filteredCompanies.length === 0 ? (
                    <EmptyState
                        title="No companies found"
                        message={`Nothing matches "${searchQuery}". Try a different name or symbol.`}
                    />
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {filteredCompanies.map((company, index) => {
                            const compId = company.id || company.company_id;
                            const tracked = isTracked(compId);
                            const busy = actionLoading === compId;

                            return (
                                <button
                                    key={compId}
                                    onClick={() => handleToggleCompany(company)}
                                    disabled={busy}
                                    style={{ animationDelay: `${Math.min(index, 24) * 22}ms` }}
                                    className={`
                                        animate-fade-in-up group flex items-center justify-between gap-3 p-4 rounded-2xl border text-left
                                        transition-all duration-200 active:scale-[0.985] disabled:cursor-wait
                                        ${tracked
                                            ? "border-[#33D097] bg-[#33D097]/[0.07] shadow-glow"
                                            : "border-[#222A38] bg-[#10141E] hover:border-[#33D097]/50 hover:-translate-y-0.5 hover:bg-[#141927]"}
                                    `}
                                >
                                    <div className="min-w-0 space-y-1.5">
                                        <div className="flex items-center gap-2">
                                            <span className="font-mono text-sm font-extrabold text-[#E3E5EA] bg-[#0B0E16] px-2 py-0.5 border border-[#222A38] rounded">
                                                {company.symbol}
                                            </span>
                                            <span className="font-mono text-[9px] font-bold px-1.5 py-0.5 rounded bg-[#10141E] border border-[#222A38] text-[#646E7E] uppercase tracking-wide">
                                                NSE · BSE
                                            </span>
                                        </div>
                                        <span className="block text-xs font-semibold text-[#9298A0] truncate">
                                            {company.company_name}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-3 shrink-0">
                                        {tracked && (
                                            <span className="hidden sm:inline font-mono text-[9px] font-bold uppercase tracking-wider text-[#33D097]">
                                                Tracking
                                            </span>
                                        )}
                                        <span
                                            className={`
                                                flex items-center justify-center w-7 h-7 rounded-xl border transition-all duration-200
                                                ${tracked
                                                    ? "bg-[#33D097] border-[#33D097] text-[#07090F] scale-100"
                                                    : "bg-[#0B0E16] border-[#222A38] text-[#646E7E] group-hover:border-[#33D097]/60 group-hover:text-[#33D097]"}
                                            `}
                                        >
                                            {busy ? (
                                                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                                </svg>
                                            ) : tracked ? (
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                </svg>
                                            ) : (
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
                                                </svg>
                                            )}
                                        </span>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                )}
            </section>

            {/* ── Sticky done bar ───────────────────────────────────────── */}
            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 w-[calc(100%-2rem)] max-w-md">
                <div className="flex items-center justify-between gap-6 rounded-2xl border border-[#222A38] bg-[#10141E]/95 backdrop-blur px-5 py-3.5 shadow-card">
                    <div className="text-left font-mono leading-tight">
                        <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#646E7E]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#33D097]" />
                            Saved automatically
                        </span>
                        <span className="text-base font-extrabold text-[#E3E5EA]">
                            {selectedCount} <span className="text-[#2A3344]">/</span> {limit} tracked
                        </span>
                    </div>
                    <button
                        onClick={() => navigate("/dashboard")}
                        className="bg-[#33D097] hover:bg-[#3BE6A7] text-[#07090F] rounded-xl py-2.5 px-6 font-bold text-sm transition active:scale-[0.97] shadow-glow"
                    >
                        Done
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CompanySelection;
