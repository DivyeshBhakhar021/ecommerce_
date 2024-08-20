const express = require("express");
const { subcategoriesController } = require("../../../controller");
const { verifiy } = require("../../../utilse/twilio");

const router = express.Router();

router.get(
    "/list-subcategories",
    // verifiy,
    subcategoriesController.listSubcategories
)   

router.get(
    "/list-categories-bycategories/category_id",
    subcategoriesController.listcategories
)  

router.post("/add-subcategories",
    subcategoriesController.addSubcategories
)

router.put(
    "/update-subcategories/:subcategory_id",
    subcategoriesController.updateSubcategories
)

router.delete("/delete-subcategories/:subcategory_id",
    subcategoriesController.deleteSubcategories
)

router.get("/countActiveSubCategories",
    subcategoriesController.countActiveSubCategories
)

router.get("/getMostProductsSubcategories",
    subcategoriesController.getMostProductsSubcategories
)


module.exports = router