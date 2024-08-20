const SubCategories = require("../modal/subcategories.modal");
const Categories = require("../modal/categories.modal");

const listSubcategories = async (req, res) => {
    try {
        const subcategories = await SubCategories.find();

        // console.log(subcategories);

        if (!subcategories || subcategories.length === 0) {
            res.status(404).json({
                success: false,
                message: "subcategories not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "subcategories found",
            data: subcategories
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error" + error.message
        });
    }
}

const listcategories = async (req, res) => {
  try {
    const categories = await Categories.find({categoryId: req.params.categoryId});
    console.log("categories",categories);



      if (!categories || categories.length === 0) {
          res.status(404).json({
              success: false,
              message: "subcategories not found"
          });
      }

      res.status(200).json({
          success: true,
          message: "subcategories found",
          data: categories
      });
  } catch (error) {
      res.status(500).json({
          success: false,
          message: "Internal server error" + error.message
      });
  }
}

const addSubcategories =async (req, res) => { 
    try {
        // console.log(req.body);
    
        const newsubCategory = await SubCategories.create(req.body);
        
        if (!newsubCategory) {
          res.status(400).json({
            success: false,
            message: "failed to added category"
          });
        }
        res.status(201).json({
          success: true,
          message: "Category added successfully",
          data: newsubCategory,
        });
        
      } catch (error) {
        res.status(500).json({
          success: false,
          message: "Internal server error: " + error.message,
        });
      }
}

const updateSubcategories = async (req, res) => {
    try {
        const updatedsubCategory = await SubCategories.findByIdAndUpdate(req.params.subcategory_id,req.body,
          { new: true, runValidators: true }
        );
    
        if (!updatedsubCategory) {
           res.status(404).json({
            success: false,
            message: "Category not found",
          });
        }
    
        res.status(200).json({
          success: true,
          message: "Category updated successfully",
          data: updatedsubCategory,
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          message: "Internal server error: " + error.message,
        });
      }
}

const deleteSubcategories = async(req, res) => {
    try {
        const deletesubcategory = await SubCategories.findByIdAndDelete(req.params.subcategory_id);
    
        if (!deletesubcategory) {
           res.status(404).json({
            success: false,
            message: "Category not found",
          });
        }
    
        res.status(200).json({
          success: true,
          message: "Category deleted successfully",
          data: deletesubcategory,
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          message: "Internal server error: " + error.message,
        });
      }
}
// /subcategory/inactive                               //Retrieve a list of inactive subcategories.
const countActiveSubCategories = async (req, res) => {
  try {

    const count = await Categories.countDocuments([
        {
          $match: {
          is_active:false
          }
        },{
          $count: 'totalCountofFalse'
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

// /subcategory/most-products                          //Retrieve subcategories with the highest number of products.
const getMostProductsSubcategories = async (req, res) => {
  try {
    const subcategoriesdata = await SubCategories.aggregate([
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "subcategory_id",
          as: "product"
        }
  },{
    $group: {
      _id: "$_id",
      name: {$first: "$name"},
      avgproduct:{
        $avg:{$size:"$product"}
      }
    }
  }
    ]);

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


module.exports = { listcategories, listSubcategories, addSubcategories, updateSubcategories, deleteSubcategories ,countActiveSubCategories,getMostProductsSubcategories}  