const express = require("express");
const router = express.Router();

const categories = require("./categories.routes");
const subcategories = require("./subcategories.routes");
const productes = require("./product.routes");
const variants = require("./variants.routes");
const customers = require("./customers.routes");
const orders = require("./orders.routes");
const salespeople = require("./salespeople.routes");
const users = require("./users.routes");


router.use("/categories", categories)
router.use("/subcategories", subcategories)
router.use("/productes", productes)
router.use("/variants", variants)
router.use("/customers", customers)
router.use("/orders",orders)
router.use("/salespeople",salespeople)
router.use("/users",users)

module.exports = router