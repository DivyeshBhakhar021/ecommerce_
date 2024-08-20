const express = require("express");
const { salespeoplectontroller } = require("../../../controller");

const router = express.Router();

router.get(
    "/list-salespeople",
    salespeoplectontroller.listsalespeople
)

router.post(
    "/add-salespeople",
    salespeoplectontroller.adddatasalespeople
)

router.delete(
    '/delete-salespeople/:snum',
    salespeoplectontroller.deleteSalespeople
)

router.put(
    '/update-salespeople/:snum',
    salespeoplectontroller.updateSalespeople
)


module.exports = router