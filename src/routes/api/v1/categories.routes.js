const express = require("express");
const { categoriesController } = require("../../../controller");
const { twilioSms } = require("../../../utilse/twilio");
const validate = require("../../../middleware/validate");
const { categotyValidtion } = require("../../../validation");
const auth = require("../../../middleware/auth");

const router = express.Router();

router.get (
    "/get-categorie",
    validate(categotyValidtion.getCategory),
    categoriesController.getCategory
)

router.get(
    "/list-categories",
    auth(["admin","user"]),
    // // twilioSms,
    // validate(categotyValidtion.getCategory),
    categoriesController.listCategories
)

router.post("/addcategories",
    validate(categotyValidtion.createcatrgory),
    categoriesController.addCategories
 )

router.put("/updateCategories/:category_id",
    validate(categotyValidtion.updateCategory),
    categoriesController.updateCategories
)

router.delete("/deleteCategories/:category_id",
    validate(categotyValidtion.deleteCategory),
    categoriesController.deleteCategories
)

router.get("/count-subcategories", 
    categoriesController.countsubcategories
)

router.get("/countActiveCategories",
    categoriesController.countActiveCategories
)



router.get("/count-active", categoriesController.countActiveCategory);

router.get("/most-products", categoriesController.mostProductCat);

router.get("/average-products", categoriesController.totalProduct);

router.get("/count-subcategories", categoriesController.countSubcategory);

router.get("/inactive", categoriesController.inActiveCategory)



module.exports = router