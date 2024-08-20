const express = require("express");
const { customersController } = require("../../../controller");

const router = express.Router();

router.get(
    "/list-customers",
    customersController.listcustomers
)




module.exports = router