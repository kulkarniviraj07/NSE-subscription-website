import axios from "axios";

const API = axios.create({

    baseURL:
        "http://localhost:5000/api"

});

export async function sendOtp(
    payload
) {

    const response =

        await API.post(

            "/auth/send-otp",

            payload

        );

    return response.data;

}

export async function verifyOtp(
    payload
) {

    const response =

        await API.post(

            "/auth/verify-otp",

            payload

        );

    return response.data;

}