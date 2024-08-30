const Categories = require("../modal/categories.modal");
const SubCategories = require("../modal/subcategories.modal");


const listCategories = async (req, res) => {
  // console.log(req.query.page, req.query.pageSize);
  console.log("ui",req.body);
  
  try {
    

    let page = parseInt(req.query.page)
    let pageSize = parseInt(req.query.pageSize)

    if (page <= 0 && pageSize <= 0) {
      res.status(400).json({
        success: false,
        message: "page or pageSize is must be less than more zero",
      });
    }
    const categeryis = await Categories.find();
    if (!categeryis || categeryis.length === 0) {
      res.status(404).json({
        success: false,
        message: "categories not found"
      });
    }

    let startIndex=[], endIndex=[],paginationData=[]

    if (page > 0 && pageSize > 0) {
      startIndex = (page-1)*pageSize
      endIndex = page * pageSize
      paginationData = categeryis.slice(startIndex, endIndex)
    }

    res.status(200).json({
      success: true,
      message: "categories found",
      totalData: categeryis.length,
      data: paginationData
    });
    

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error" + error.message
    });
  }
}

const getCategory = async (req, res) => {
  try {
    const categories = await Categories.findById(req.params.categoryId);
    console.log("categories", req.params.categoryId);



      if (!categories || categories.length === 0) {
         return res.status(404).json({
              success: false,
              message: "categories not found"
          });
      }

      res.status(200).json({
          success: true,
          message: "categories found",
          data: categories
      });
  } catch (error) {
     return  res.status(500).json({
          success: false,
          message: "Internal server error" + error.message
      });
  }
}

const addCategories = async (req, res) => {
  try {
    // console.log(req.body);

    try {
      const newCategory = await Categories.create(req.body);

      if (!newCategory) {
        res.status(400).json({
          success: false,
          message: "failed to added category"
        });
      }
      res.status(200).json({
        success: true,
        message: "Category added successfully",
        data: newCategory,
      });

    } catch (error) {
      console.log(error);
    }



  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error: " + error.message,
    });
  }
}

const updateCategories = async (req, res) => {
  // console.log(req.body);
  try {
    const updatedCategory = await Categories.findByIdAndUpdate(req.params.category_id, req.body,
      { new: true, runValidators: true }
    );

    if (!updatedCategory) {
      res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Category updated successfully",
      data: updatedCategory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error: " + error.message,
    });
  }
}

const deleteCategories = async (req, res) => {
  try {
    const category = await Categories.findByIdAndDelete(req.params.category_id);

    if (!category) {
      res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
      data: category,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error: " + error.message,
    });
  }
}

// /category/count-subcategories   //Retrieve the count of subcategories for each category.
const countsubcategories = async (req, res) => {
  try {
    // console.log(req.body);

    const categories = await Categories.aggregate([
      {
              $lookup: {
                from: "subcategories",
                localField: "_id",
                foreignField: "categoriesid",
                as: "subcategory"
              }
            },{
              $project:  {
                _id: 1,
                name:1,
                subcount: {
                $size:"$subcategory"
                }
              }
            }
      ])

    res.status(200).json({
      success: true,
      message: "categories found",
      data: categories
    })
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error: " + error.message,
    });
  }
}

// /category/count-active          //Retrieve the total count of active categories.
const countActiveCategories = async (req, res) => {
  try {

    const count = await Categories.countDocuments([
      {
        $match: {
          is_active: true
        }
      },{
        $count: 'totalconutIsActive'
      }
    ])

    res.status(200).json({
      success: true,
      message: "Active categories count",
      data: count,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error: " + error.message,
    });
  }
};

const countActiveCategory = async (req, res) => {
  try {
    const count = await Categories.aggregate([
      {
        $match: {
          is_active: true
        }
      },
      {
        $count: 'isActive'
      }
    ]);
    res.status(200).json({
      success: true,
      message: "Inactive category count",
      data: count,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error: " + error.message,
    });
  }
};

const mostProductCat = async (req, res) => {
  try {
    const count = await Categories.aggregate([
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "categoriesid",
          as: "products"
        }
      },
      {
        $project: {
          categoryName: "$name",
          productCount: { $size: "$products" }
        }
      },
      {
        $sort: {
          productCount: -1
        }
      },
      {
        $limit: 3
      }
    ]);
    res.status(200).json({
      success: true,
      message: "Inactive category count",
      data: count,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error: " + error.message,
    });
  }
};

const totalProduct = async (req, res) => {
  try {
    const count = await Categories.aggregate([
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "categoriesid",
          as: "Products"
        }
      },
      {
        $unwind: {
          path: "$Products"
        }
      },
      {
        $group: {
          _id: "$_id",
          category_name: {$first: "$name"},
          totalProduct: {
            $sum: 1
          }
        }
      }
    ]);
    res.status(200).json({
      success: true,
      message: "Inactive category count",
      data: count,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error: " + error.message,
    });
  }
};

const countSubcategory = async (req, res) => {
  try {
    const count = await Categories.aggregate([
      {
        $lookup: {
          from: "subcategories",
          localField: "_id",
          foreignField: "category_id",
          as: "Subcategory",
        },
      },
      {
        $group: {
          _id: "$_id",
          name: { $first: "$name" },
          countSubcategory: {
            $sum: { $size: "$Subcategory" },
          },
        },
      },
    ]);
    res.status(200).json({
      success: true,
      message: "Subcategory count",
      data: count,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error: " + error.message,
    });
  }
};

const inActiveCategory = async (req, res) => {
  try {
    const count = await Categories.aggregate(  [
      {
           $match: {
             is_active: false
           }
         },
         {
           $count: 'inActive'
         }
       
   ]);
    res.status(200).json({
      success: true,
      message: "Inactive category count",
      data: count,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error: " + error.message,
    });
  }
};

const serachproduct = async (req,res) =>{
  try {
      const { category_id, priceRange, rating, skip, limit } = req.body;
      const products = await Products.aggregate([
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
            $match: {
              avgRating: { $gte: 4 },
              category_id: 1,
              "variants.attributes.Price": { $gte: 0, $lte: 10000 }
            }
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
              name: 1
            }
          },
          {
            $skip: 0
          },
          {
            $limit: 10
          }
        ])

        res.status(200).json({
          success: true,
          message: "Products retrieved successfully",
          data: products
      });
  } catch (error) {
       res.status(500).json({
          success: false,
          message: "Internal server error: " + error.message
      });
  
  }
} 


module.exports = {getCategory,serachproduct, listCategories, addCategories, updateCategories, deleteCategories ,countsubcategories,countActiveCategories,countActiveCategory,mostProductCat,totalProduct,countSubcategory,inActiveCategory}