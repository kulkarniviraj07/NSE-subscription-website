import API from "./axios";

export async function createOrder() {

    const response =
        await API.post(
            "/payments/create-order"
        );

    return response.data;

}

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