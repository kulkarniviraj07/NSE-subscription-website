const express =
    require(
        "express"
    );

const router =
    express.Router();

const companyController =
    require(
        "../controllers/companyController"
    );

router.get(

    "/",

    companyController
        .getCompanies

);

router.get(

    "/search",

    companyController
        .searchCompanies

);

module.exports =
    router;