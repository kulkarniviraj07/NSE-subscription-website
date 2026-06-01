import axios from "axios";

const API = axios.create({

    baseURL:
        "http://localhost:5000/api"

});

export async function activateFreePlan() {

    const token =
        localStorage.getItem(
            "token"
        );

    const response =

        await API.post(

            "/subscriptions/free",

            {},

            {
                headers: {

                    Authorization:
                        `Bearer ${token}`

                }
            }

        );

    return response.data;

}