import axios from "axios";

const API = axios.create({

    baseURL:
        "http://localhost:5000/api"
    ,

    headers: {

        Authorization:
            `Bearer ${localStorage.getItem("token")}`

    }

});

export async function getCompanies() {

    const response =

        await API.get(
            "/companies"
        );

    return response.data;

}

export async function getUserCompanies() {

    const response =

        await API.get(
            "/user/companies"
        );

    return response.data;

}

export async function addCompany(
    companyId
) {

    const response =

        await API.post(

            "/user/companies",

            {
                companyId
            }

        );

    return response.data;

}