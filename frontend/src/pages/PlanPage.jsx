import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import PlanCard from "../components/PlanCard";
import Loader from "../components/Loader";

import { getPlans } from "../services/planApi";
import { activateFreePlan } from "../services/subscriptionApi";

import {
    createOrder,
    verifyPayment
} from "../services/paymentApi";

function PlanPage() {

    const navigate = useNavigate();

    const [plans, setPlans] = useState([]);

    useEffect(() => {

        loadPlans();

    }, []);

    async function loadPlans() {

        try {

            const response =
                await getPlans();

            setPlans(
                response.plans || []
            );

        }
        catch (err) {

            console.error(err);

        }

    }

    async function selectPlan(
        plan
    ) {

        try {

            localStorage.setItem(

                "selectedPlan",

                JSON.stringify(plan)

            );

            if (
                plan.name === "FREE"
            ) {

                await activateFreePlan();

                navigate(
                    "/companies"
                );

                return;

            }

            if (
                plan.name === "PREMIUM"
            ) {
                // Defensive loading of Razorpay SDK script dynamically
                const loaded = await new Promise((resolve) => {
                    if (window.Razorpay) {
                        resolve(true);
                        return;
                    }
                    const script = document.createElement("script");
                    script.src = "https://checkout.razorpay.com/v1/checkout.js";
                    script.onload = () => resolve(true);
                    script.onerror = () => resolve(false);
                    document.body.appendChild(script);
                });

                console.log("window.Razorpay", window.Razorpay);
                console.log("Razorpay key", import.meta.env.VITE_RAZORPAY_KEY_ID);

                if (!loaded || !window.Razorpay) {
                    alert("Razorpay SDK failed to load. Please verify your internet connection or disable any active ad-blockers blocking checkout.razorpay.com.");
                    return;
                }

                const orderResponse =
                    await createOrder();

                console.log("Order response", orderResponse);

                const order =
                    orderResponse.order;

                const options = {

                    key:
                        import.meta.env
                            .VITE_RAZORPAY_KEY_ID,

                    amount:
                        order.amount,

                    currency:
                        order.currency,

                    name:
                        "PureFrames",

                    description:
                        "Premium Subscription",

                    order_id:
                        order.id,

                    handler:
                        async function (
                            response
                        ) {

                            try {

                                await verifyPayment({

                                    razorpay_order_id:
                                        response.razorpay_order_id,

                                    razorpay_payment_id:
                                        response.razorpay_payment_id,

                                    razorpay_signature:
                                        response.razorpay_signature

                                });

                                navigate(
                                    "/companies"
                                );

                            }
                            catch (err) {

                                console.error(
                                    err
                                );

                                alert(
                                    "Payment verification failed"
                                );

                            }

                        },

                    prefill: {

                        name:
                            localStorage.getItem(
                                "name"
                            ),

                        contact:
                            localStorage.getItem(
                                "mobile"
                            )

                    },

                    theme: {

                        color:
                            "#2563EB"

                    }

                };

                console.log("Options", options);

                const razorpay =

                    new window.Razorpay(
                        options
                    );

                razorpay.open();

                return;

            }

        }
        catch (err) {

            console.error(err);

            alert(

                err?.response?.data?.message ||

                err?.message ||

                "Failed to activate plan"

            );

        }

    }

    return (

        <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center py-12 px-4 relative overflow-hidden">

            <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-4xl w-full relative z-10">

                <div className="text-center mb-12">

                    <h1 className="text-4xl font-extrabold text-[#0F172A] tracking-tight sm:text-5xl">

                        Choose Your Plan

                    </h1>

                    <p className="text-[#64748B] text-base sm:text-lg mt-3 font-medium max-w-md mx-auto">

                        Select a plan that fits your tracking needs. No hidden charges.

                    </p>

                </div>

                {

                    plans.length === 0

                        ? (

                            <div className="flex flex-col items-center justify-center p-12 bg-white rounded-3xl border border-slate-100 shadow-sm max-w-md mx-auto">

                                <Loader />

                                <p className="text-[#64748B] font-semibold text-sm mt-4">

                                    Loading plans...

                                </p>

                            </div>

                        )

                        : (

                            <div className="grid md:grid-cols-2 gap-8 items-stretch max-w-3xl mx-auto">

                                {

                                    plans.map(

                                        (plan) => (

                                            <PlanCard

                                                key={plan.id}

                                                title={plan.name}

                                                price={plan.price}

                                                limit={plan.company_limit}

                                                onSelect={() =>
                                                    selectPlan(
                                                        plan
                                                    )
                                                }

                                            />

                                        )

                                    )

                                }

                            </div>

                        )

                }

            </div>

        </div>

    );

}

export default PlanPage;