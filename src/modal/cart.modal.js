const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    pid: {
      type: mongoose.Types.ObjectId,
      ref: "Products",
      required: true,
    },
  },
  {
    quntity: {
      type: Number,
      required: true,
      default: 1,
    },
  }
);

const cartsSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    items: [itemSchema],
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

const Carts = mongoose.model("Carts", cartsSchema);
module.exports = Carts;
