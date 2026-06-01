import API from "./axios";

/**
 * Create Razorpay Order
 */
export async function createOrder() {

    const response =

        await API.post(
            "/payments/create-order"
        );

    return response.data;

}

/**
 * Verify Razorpay Payment
 */
export async function verifyPayment(
    paymentData
) {

    const response =

        await API.post(

            "/payments/verify",

            paymentData

        );

    return response.data;

}