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

router.get("/newArrivals",
    productCproductontroller.newArrivals
)

router.get("/Countcategory",
    productCproductontroller.Countcategory
)

router.get("/getProductBySubcategory",
    productCproductontroller.getProductBySubcategory
)

router.get('/topRate',
    productCproductontroller.topRate
)

router.get(
    '/out-of-stock',
    productCproductontroller.outofstock
)

router.get(
    '/variant-details/:product_id',
    productCproductontroller.variantsDatils
  )

  router.get(
    '/category/:category_id',
    productCproductontroller.productByCategory
)

router.get(
    '/get-product/:product_id',
    productCproductontroller.getProduct
)


module.exports = router