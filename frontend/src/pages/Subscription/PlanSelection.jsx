import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useApp from "../../hooks/useApp";
import Button from "../../components/ui/Button";
import { createOrder } from "../../api/payment.api";

/**
 * Simplified Plan Selection Page.
 * Displays exactly two pricing cards with minimal text and large action buttons.
 */
export function PlanSelection() {
    const {
        plans,
        currentSubscription,
        handleActivateFree,
        loadAppData,
        loading
    } = useApp();

    const navigate = useNavigate();
    const [actionLoading, setActionLoading] = useState(null); // plan name being selected
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    // Fallback plans
    const activePlans = plans.length > 0 ? plans : [
        { id: 1, name: "FREE", price: 0, company_limit: 5, duration_days: 3650 },
        { id: 2, name: "PREMIUM", price: 119, company_limit: 25, duration_days: 30 }
    ];

    /**
     * Activates the FREE plan
     */
    const handleSelectFree = async () => {
        setActionLoading("FREE");
        setErrorMessage("");
        setSuccessMessage("");
        try {
            await handleActivateFree();
            setSuccessMessage("FREE Plan activated successfully! Redirecting...");
            setTimeout(() => {
                navigate("/dashboard");
            }, 1500);
        } catch (err) {
            setErrorMessage(err.message || "Failed to activate Free subscription.");
        } finally {
            setActionLoading(null);
        }
    };

    /**
     * Activates the PREMIUM plan (Razorpay order + verification)
     */
    const handleSelectPremium = async (plan) => {
        setActionLoading("PREMIUM");
        setErrorMessage("");
        setSuccessMessage("");

        try {
            const orderData = await createOrder();
            const order = orderData.order;

            if (!window.Razorpay) {
                setErrorMessage("Razorpay SDK not loaded");
                return;
            }

            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID,
                amount: order.amount,
                currency: order.currency,
                name: "PureFrames",
                description: "Premium Subscription",
                order_id: order.id,
                handler: async function (response) {
                    try {
                        const { verifyPayment } = await import("../../api/payment.api");
                        await verifyPayment({
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature
                        });
                        await loadAppData();

                        setSuccessMessage("Premium subscription activated");
                        navigate("/companies");
                    } catch (err) {
                        console.error(err);
                        setErrorMessage("Payment verification failed");
                    }
                },
                prefill: {
                    name: localStorage.getItem("name") || "",
                    contact: localStorage.getItem("mobile") || ""
                },
                theme: {
                    color: "#2563EB"
                }
            };

            const razorpay = new window.Razorpay(options);
            razorpay.open();
        } catch (err) {
            console.error(err);
            setErrorMessage(
                err?.response?.data?.message || "Order creation failed"
            );
        } finally {
            setActionLoading(null);
        }
    };

    return (
        <div className="space-y-6 pb-8 font-sans bg-slate-50 text-slate-800">
            {/* Minimal Header */}
            <div className="text-center max-w-sm mx-auto space-y-2 mt-4 text-left">
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight text-center">
                    Plans
                </h2>
                <p className="text-slate-500 text-xs leading-relaxed text-center">
                    Simple and transparent pricing plans.
                </p>
            </div>

            {/* Notifications */}
            {errorMessage && (
                <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-2xl text-xs font-semibold flex items-center gap-2.5 shadow-sm max-w-md mx-auto text-left">
                    <svg className="w-4.5 h-4.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <span>{errorMessage}</span>
                </div>
            )}

            {successMessage && (
                <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-600 rounded-2xl text-xs font-semibold flex items-center gap-2.5 shadow-sm max-w-md mx-auto text-left">
                    <svg className="w-4.5 h-4.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{successMessage}</span>
                </div>
            )}

            {/* Exactly Two Plan cards */}
            <div className="flex flex-col md:flex-row gap-6 max-w-2xl mx-auto justify-center px-4">
                {activePlans.map((plan, idx) => {
                    const isPremiumPlan = plan.name === "PREMIUM";
                    const currentPlanName =
                        currentSubscription?.plan_name ||
                        currentSubscription?.name ||
                        "";

                    const isCurrent =
                        currentPlanName === plan.name;
                    const itemLoading = actionLoading === plan.name;

                    return (
                        <div
                            key={plan.id || idx}
                            className={`
                                relative p-6 bg-white rounded-2xl border text-left flex flex-col justify-between overflow-hidden shadow-sm flex-1 min-w-[280px]
                                ${isPremiumPlan ? "border-blue-600 ring-2 ring-blue-50" : "border-slate-200"}
                                transition duration-150 hover:shadow-md
                            `}
                        >
                            <div className="space-y-4">
                                <h3 className="text-xl font-bold text-slate-900 uppercase tracking-wide">
                                    {plan.name}
                                </h3>

                                <div className="flex items-baseline gap-1 border-b border-slate-100 pb-4">
                                    <span className="text-4xl font-bold text-slate-900 tracking-tight">
                                        ₹{parseFloat(plan.price).toFixed(0)}
                                    </span>
                                    <span className="text-xs text-slate-400 font-semibold uppercase">
                                        {isPremiumPlan ? "/ month" : ""}
                                    </span>
                                </div>

                                {/* Minimal Features list */}
                                <ul className="space-y-3 py-2 text-xs font-semibold text-slate-500">
                                    <li className="flex items-center gap-2.5">
                                        <svg className="w-4 h-4 text-blue-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                        Access all 500 companies
                                    </li>
                                    <li className="flex items-center gap-2.5">
                                        <svg className="w-4 h-4 text-blue-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                        Select up to <span className="text-slate-900 font-bold">{plan.company_limit} companies</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Plan Action CTA */}
                            <div className="mt-6 pt-3.5 border-t border-slate-100">
                                {isCurrent ? (
                                    <button
                                        disabled
                                        className="w-full h-12 border border-emerald-200 bg-emerald-50 text-emerald-700 rounded-xl font-bold text-xs uppercase tracking-wider cursor-not-allowed flex items-center justify-center gap-1.5 focus:outline-none"
                                    >
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                        Current Plan
                                    </button>
                                ) : (
                                    <Button
                                        onClick={isPremiumPlan ? () => handleSelectPremium(plan) : handleSelectFree}
                                        loading={itemLoading || loading}
                                        disabled={actionLoading !== null}
                                        variant="primary"
                                        className={`w-full !h-12 text-xs uppercase tracking-wider !rounded-xl !font-bold ${isPremiumPlan
                                            ? "!bg-blue-600 hover:!bg-blue-700 !text-white focus:!ring-blue-100"
                                            : "!bg-slate-100 hover:!bg-slate-200 !text-slate-700"
                                            }`}
                                    >
                                        {isPremiumPlan ? "Upgrade Now" : "Choose Free"}
                                    </Button>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default PlanSelection;
