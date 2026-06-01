const express =
    require(
        "express"
    );

const router =
    express.Router();

const authMiddleware =
    require(
        "../middlewares/authMiddleware"
    );

const controller =
    require(
        "../controllers/userCompanyController"
    );

router.get(

    "/companies",

    authMiddleware,

    controller.getCompanies

);

router.post(

    "/companies",

    authMiddleware,

    controller.addCompany

);

router.delete(

    "/companies",

    authMiddleware,

    controller.removeCompany

);

module.exports =
    router;