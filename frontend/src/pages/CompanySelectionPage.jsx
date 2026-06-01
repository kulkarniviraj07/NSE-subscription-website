import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import SearchBar from "../components/SearchBar";
import CompanyCard from "../components/CompanyCard";
import Button from "../components/Button";
import Loader from "../components/Loader";

import { getCompanies, addCompany } from "../services/companyApi";

function CompanySelectionPage() {
    const navigate = useNavigate();

    const [companies, setCompanies] = useState([]);
    const [search, setSearch] = useState("");
    const [selected, setSelected] = useState([]);
    const [loadingCompanies, setLoadingCompanies] = useState(true);
    const [saving, setSaving] = useState(false);

    const plan = JSON.parse(localStorage.getItem("selectedPlan"));
    const limit = plan?.company_limit || 5;

    useEffect(() => {
        loadCompanies();
    }, []);

    async function loadCompanies() {
        try {
            setLoadingCompanies(true);
            const response = await getCompanies();
            setCompanies(response.companies || []);
        }
        catch (err) {
            console.error(err);
        }
        finally {
            setLoadingCompanies(false);
        }
    }

    function toggleCompany(company) {
        const exists = selected.find((c) => c.id === company.id);

        if (exists) {
            setSelected(selected.filter((c) => c.id !== company.id));
            return;
        }

        if (selected.length >= limit) {
            alert(`Maximum ${limit} companies allowed`);
            return;
        }

        setSelected([...selected, company]);
    }

    async function saveSelection() {
        try {
            setSaving(true);
            for (const company of selected) {
                await addCompany(company.id);
            }
            navigate("/dashboard");
        }
        catch (err) {
            console.error(err);
            alert(
                err?.response?.data?.message ||
                err?.message ||
                "Failed to save companies"
            );
        }
        finally {
            setSaving(false);
        }
    }

    const filteredCompanies = companies.filter(
        (company) =>
            company.company_name
                .toLowerCase()
                .includes(search.toLowerCase()) ||
            company.symbol
                .toLowerCase()
                .includes(search.toLowerCase())
    );

    const percentage = Math.min((selected.length / limit) * 100, 100);

    return (
        <div className="min-h-screen bg-[#F8FAFC] py-8 sm:py-12 px-4 relative overflow-hidden">
            {/* Decorative background grids */}
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-2xl mx-auto bg-white rounded-[32px] shadow-xl shadow-slate-100/50 border border-slate-100 p-6 sm:p-10 relative z-10">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
                        Select Companies
                    </h1>
                    <p className="text-[#64748B] text-sm sm:text-base mt-1.5 font-medium">
                        Search and select the companies you want to track.
                    </p>
                </div>

                {/* Progress Tracker Card */}
                <div className="mb-6 p-4 sm:p-5 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-xs sm:text-sm font-bold text-[#64748B] uppercase tracking-wider">
                            Selection Limit
                        </span>
                        <span className="text-sm font-bold text-[#0F172A]">
                            {selected.length} <span className="text-[#64748B] font-medium">/ {limit} Selected</span>
                        </span>
                    </div>
                    {/* Visual Progress Bar */}
                    <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                        <div 
                            className="h-full bg-[#2563EB] rounded-full transition-all duration-300 ease-out"
                            style={{ width: `${percentage}%` }}
                        />
                    </div>
                </div>

                {/* Search Bar Component */}
                <SearchBar
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                {/* Scrollable list & states */}
                {loadingCompanies ? (
                    <div className="py-20 flex flex-col items-center justify-center">
                        <Loader />
                        <p className="text-[#64748B] font-semibold text-sm mt-4">Loading companies...</p>
                    </div>
                ) : filteredCompanies.length === 0 ? (
                    /* Elegant Search Empty State */
                    <div className="py-16 px-4 flex flex-col items-center justify-center border border-dashed border-slate-200 rounded-2xl bg-slate-50/30 text-center">
                        <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200/50 flex items-center justify-center mb-4">
                            <svg className="w-6 h-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <h3 className="text-base font-bold text-[#0F172A]">No companies found</h3>
                        <p className="text-xs sm:text-sm font-medium text-[#64748B] mt-1 max-w-xs leading-relaxed">
                            We couldn't find any matches for "{search}". Try searching for a different company or symbol.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1.5 custom-scrollbar">
                        {filteredCompanies.map((company) => (
                            <CompanyCard
                                key={company.id}
                                company={company}
                                selected={selected.some((c) => c.id === company.id)}
                                onToggle={() => toggleCompany(company)}
                            />
                        ))}
                    </div>
                )}

                {/* Sticky Action Footer */}
                <div className="mt-8 pt-4 border-t border-slate-100">
                    <Button
                        onClick={saveSelection}
                        disabled={saving || selected.length === 0}
                        loading={saving}
                    >
                        Save Selection
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default CompanySelectionPage;