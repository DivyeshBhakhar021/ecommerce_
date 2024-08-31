const express = require('express');
const { variantsController } = require('../../../controller');
const upload = require('../../../middleware/upload');
const router = express.Router()

router.get(
    "/list-variants",
    variantsController.listVariants
)

router.get(
    "/list-variants/:variant_id",
    variantsController.getVariant
)

router.post(
    "/add-variant",
    upload.array('variant_image', [10]),
    variantsController.addVariant
)

router.put(
    "/update-variant/:variant_id",
    // upload.single('variant_image'),
    variantsController.updateVariant
)

router.delete(
    "/delete-variant/:variant_id",
    variantsController.deleteVariant
)

router.get(
    '/count-stock/:variant_id',
    variantsController.countstock
)

router.get(
    '/active',
    variantsController.activevarint
)

router.get(
    '/count-products',
    variantsController.countptoduct
)

router.get(
    '/product/:product_id',
    variantsController.variantparticularproduct
)

router.get(
    '/list-variant/:product_id',
    variantsController.Variantdetails
)

router.get('/product-highest-Price',
    variantsController.productswithhighesprices
)

router.get('/multiple-variants',
    variantsController.morethanonevariant
)

router.get('/low-quantity',
    variantsController.productslowstock
)

module.exports = router
