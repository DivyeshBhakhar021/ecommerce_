const express = require("express");
const { productCproductontroller } = require("../../../controller");
const upload = require("../../../middleware/upload");



const router = express.Router();

router.get(
    "/list-Product",
    productCproductontroller.listProduct
)

router.post("/addProduct",
    upload.single('pro_img'),
    productCproductontroller.addProduct
)

router.put(
    "/updateProduct/:product_id",
    upload.single('pro_img'),
    productCproductontroller.updateProduct
)

router.delete("/deleteProduct/:product_id",
    productCproductontroller.deleteProduct
)
router.get("/getProductscategories",
    productCproductontroller.getProductscategories
)

router.get("/serachproduct",
    productCproductontroller.serachproduct
)

module.exports = router