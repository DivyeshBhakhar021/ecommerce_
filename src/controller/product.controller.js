const upload = require("../middleware/upload");
const Products = require("../modal/products.modal");
const SubCategories = require("../modal/subcategories.modal");
const fileupload = require("../utilse/cloudinary");

const listProduct = async (req, res) => {
  try {
    const listProducts = await Products.find();

    // console.log(Products);
    if (!listProducts || listProducts.length === 0) {
      res.status(404).json({
        success: false,
        message: "products not found"
      });

    }

    res.status(200).json({
      success: true,
      message: "products found",
      data: listProducts
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error" + error.message
    });
  }
}

const addProduct = async (req, res) => {
  console.log("adddddd", req.body);
  console.log("addProduct", req.file.path);
  try {


    // const fileres = await fileupload(req.file.path, "pro_img");
    // console.log("fileres",fileres);

    const newproduct = await Products.create({
      ...req.body,
      pro_img: {
        url: req.file.path,
        public_id: ''
      }
    });

    console.log("newproduct", newproduct);

    if (!newproduct) {
      res.status(400).json({
        success: false,
        message: "failed to added category"
      });
    }
    res.status(201).json({
      success: true,
      message: "Category added successfully",
      data: newproduct,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error: " + error.message,
    });
  }
}

const updateProduct = async (req, res) => {
  console.log("update", req.body, req.file);
  try {
    if (req.file) {
      console.log("New File upload");
      // const fileres = await fileupload(req.file.path, "pro_img");
      // console.log(fileres);

      const updatedproduct = await Products.findByIdAndUpdate(
        req.params.product_id,
        {
          ...req.body,
          pro_img: {
            url: req.file.path,
            public_id:''
          }
        },
        { new: true, runValidators: true }
      );

      console.log("updata", updatedproduct);

      if (!updatedproduct) {
        res.status(400).json({
          success: false,
          message: "Bad request",
        });
      }

      res.status(200).json({
        success: true,
        message: "Category updated successfully",
        data: updatedproduct,
      });

    } else {
      console.log("Old file, not to upload");

      const updatedproduct = await Products.findByIdAndUpdate(req.params.product_id, req.body,
        { new: true, runValidators: true }
      );

      if (!updatedproduct) {
        res.status(400).json({
          success: false,
          message: "Bad request",
        });
      }

      res.status(200).json({
        success: true,
        message: "Category updated successfully",
        data: updatedproduct,
      });
    }
    // // const updatedproduct = await Products.findByIdAndUpdate(req.params.product_id, req.body,
    // //     { new: true, runValidators: true }
    // // );

    // if (req.file) {
    //     proRes = await fileupload(req.file.path

    //     )
    // }

    // const  updatedproduct = await Products.findById(req.params.product_id);



    // if (req.files && req.files.image) {
    //     const result = await fileupload.uploader.upload(req.files.image.path);
    //     updateData.image = result.secure_url;
    // }

    // if (!updatedproduct) {
    //     res.status(404).json({
    //         success: false,
    //         message: "Category not found",
    //     });
    // }

    // res.status(200).json({
    //     success: true,
    //     message: "Category updated successfully",
    //     data: updatedproduct,
    // });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error: " + error.message,
    });
  }
}

const deleteProduct = async (req, res) => {
  try {
    const deleteproduct = await Products.findByIdAndDelete(req.params.product_id);

    if (!deleteproduct) {
      res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
      data: deleteproduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error: " + error.message,
    });
  }
}

const getProductscategories = async (req, res) => {
  try {
    const subcategoriesdata = await SubCategories.aggregate(
      [
        {
          $lookup: {
            from: "products",
            localField: "_id",
            foreignField: "category_id",
            as: "Product"
          }
        },
        {
          $group: {
            _id: "$_id",
            countProduct: {
              $sum: 1
            }
          }
        }
      ]
    );

    res.status(200).json({
      success: true,
      message: "Subcategories with most products",
      data: subcategoriesdata
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error: " + error.message
    });
  }
};

const serachproduct = async (req, res) => {
  try {
    const { sortOrder, rating, max, min, category, page, limit } = req.body

    const mergPip = {};

    if (rating) {
      mergPip['avgRating'] = {
        $gte: rating
      }
    }

    if (category) {
      mergPip['category_id'] = category
    }

    if (min != undefined || max != undefined) {
      mergPip['variants.attributes.Price'] = {}
    }

    if (max != undefined) {
      mergPip['variants.attributes.Price'].$lte = max
    }

    // console.log("mergPip",mergPip);

    const pipeline = [
      {
        $lookup: {
          from: "variants",
          localField: "_id",
          foreignField: "product_id",
          as: "variants"
        }
      },
      {
        $lookup: {
          from: "reviews",
          localField: "_id",
          foreignField: "product_id",
          as: "reviews"
        }
      },
      {
        $addFields: {
          avgRating: { $avg: "$reviews.rating" }
        }
      },
      {
        $unwind: "$variants"
      },
      {
        $match: mergPip
      },
      {
        $group: {
          _id: "$_id",
          name: { $first: "$name" },
          variants: { $push: "$variants" },
          reviews: { $push: "$reviews" }
        }
      },
      {
        $sort: {
          name: sortOrder === 'asc' ? 1 : -1
        }
      },
      {
        $skip: 0
      },
      {
        $limit: 10
      }
    ]

    if (page >= 1 && limit >= 1) {
      pipeline.push({ $skip: (page - 1) * limit })
      pipeline.push({ $limit: limit })
    }

    const data = await Products.aggregate(pipeline);
    // console.log(data);

    res.status(200).json({
      success: true,
      message: "Products fetch successfully",
      data: data
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error: " + error.message
    });

  }

}


module.exports = { listProduct, addProduct, updateProduct, deleteProduct, getProductscategories, serachproduct }