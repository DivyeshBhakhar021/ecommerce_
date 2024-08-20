const mongoose = require("mongoose");

const imgSchema = mongoose.Schema(
  {
    public_id: String,
    url: String
  }
)


const variantsSchema = new mongoose.Schema(
  {
    category_id: {
      type: mongoose.Types.ObjectId,
      ref: 'Categories',
      required: true
    },
    subcategory_id: {
      type: mongoose.Types.ObjectId,
      ref: 'Subcategories',
      required: true
    },
    product_id: {
      type: mongoose.Types.ObjectId,
      ref: "Products",
      required: true,
    },
    attributes: {},
    variant_image: [imgSchema],
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    discount: {
      type: String,
    },
    quantity: {
      type: Number,
    },
    is_active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Variants = mongoose.model("Variants", variantsSchema);
module.exports = Variants;
