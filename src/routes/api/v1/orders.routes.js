const express = require("express");
const { customersorders } = require("../../../controller");

const router = express.Router();

router.get(
    "/list-orders",
    customersorders.listorders
)


module.exports = router