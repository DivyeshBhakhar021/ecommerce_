const Variants = require("../modal/variants.modal");
const fileupload = require("../utilse/cloudinary");

const listVariants = async (req, res) => {
    try {
        const variant = await Variants.find()
  
        if (!variant || variant.length === 0) {
            res.status(404).json({
                success: false,
                message: "variant data not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "variant data fetched",
            data: variant,
        });


    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error" + error.message
        })
    }
}

const getVariant = async (req, res) => {
    try {
        const variant = await Variants.findById(req.params.variant_id)
        if (!variant) {
            res.status(404).json({
                success: false,
                message: "Data not found." + error.message
            })
        }

        res.status(200).json({
            success: true,
            message: "Variant Data fetched",
            data: variant
        })


    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error" + error.message
        })
    }
}
// const addVariant = async (req, res) => {
//     // console.log("llllllllllllllll", req.body);
//     // console.log(req.body);
//     // console.log(req.file);

//     const fileRes = await fileupload(req.file.path, "Variant");
//     console.log(fileRes);

//     try {
//         const variant = await Variants.create({
//             ...req.body,
//             variant_image: {
//                 public_id: fileRes.public_id,
//                 url: fileRes.url
//             }
//         });

//         if (!variant) {
//             res.status(400).json({
//                 success: false,
//                 message: 'variant not created.'
//             })
//         }

//         res.status(201).json({
//             success: true,
//             message: 'variant created successfully.',
//             data: variant
//         })



//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: 'Internal Server Error.' + error.message
//         })
//     }
// }

const addVariant = async (req, res) => {
    let allFiles = [];
    if (req.files) {
        await Promise.all(
            req.files.map(async (file) => {
                const uploadedFile = await fileupload(file.path, "Variants");
                allFiles.push(uploadedFile); 
            })
        );
    }

    const img = allFiles.map((file) => {
        return {
            public_id: file.public_id,
            url: file.url
        }
    })

    try {
        const variant = await Variants.create({ ...req.body, variant_image: img });
        if (!variant) {
            res.status(400).json({
                success: true,
                message: "failed to added variant",
                data: variant,
            });
        }
        res.status(201).json({
            success: true,
            message: "variant added successfully",
            data: variant,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error: " + error.message,
        });
    }
};

const updateVariant = async (req, res) => {
    const variantId = req.params.variant_id;

    if (!variantId) {
        return res.status(400).json({
            success: false,
            message: 'Variant ID is required.'
        });
    }

    if (req.file) {

        try {
            const fileRes = await fileupload(req.file.path, "Variant");
      
            const updatedVariantData = {
                ...req.body,
                variant_image: {
                    public_id: fileRes.public_id,
                    url: fileRes.url
                }
            };

            const variant = await Variants.findByIdAndUpdate(variantId, updatedVariantData, { new: true, runValidators: true });

            if (!variant) {
                return res.status(400).json({
                    success: false,
                    message: 'Variant not updated.'
                });
            }

            res.status(200).json({
                success: true,
                message: 'Variant updated successfully.',
                data: variant
            });

        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Internal Server Error. ' + error.message
            });
        }
    } else {

        try {
            const variant = await Variants.findByIdAndUpdate(variantId, req.body, { new: true, runValidators: true });
            

            if (!variant) {
                return res.status(400).json({
                    success: false,
                    message: 'Variant not updated.'
                });
            }

            res.status(200).json({
                success: true,
                message: 'Variant updated successfully.',
                data: variant
            });

        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Internal Server Error. ' + error.message
            });
        }
    }
};

const deleteVariant = async (req, res) => {
    try {
        const variant = await Variants.findByIdAndDelete(req.params.variant_id);

        if (!variant) {
            res.status(404).json({
                success: false,
                message: "variant not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "variant deleted successfully",
            data: variant,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error: " + error.message,
        });
    }
}

const countstock = async (req, res) => {
    const variants = await Variants.aggregate([
        {
          $group: {
            _id: "$product_id",
            totalStock: { $sum: "$stock" }
          }
        },
        {
          $lookup: {
            from: "products",
            localField: "_id",
            foreignField: "_id",
            as: "productDetails"
          }
        },
        {
          $unwind: "$productDetails"
        },
        {
          $project: {
            productId: "$_id",
            totalStock: 1,
            "productDetails.name": 1,
            "productDetails.description": 1
          }
        }
      ])
    res.status(200).json({
        success: true,
        message: "variant get  succesfully",
        data: variants
    })

    console.log(variants);
}
const activevarint = async (req, res) => {
    const variants = await Variants.aggregate([
        {
            $match: {
                is_active: true
            }
        },
        {
            $project: {
                _id: 1,
                categori_id: 1,
                subcategori_id: 1,
                product_id: 1,
                price: 1,
                stock: 1,
                discount: 1,
                attributes: 1,
                createdAt: 1,
                updatedAt: 1
            }
        }
    ])
    res.status(200).json({
        success: true,
        message: "variant get  succesfully",
        data: variants
    })
    console.log(variants);
}

const countptoduct = async (req, res) => {
    const variants = await Variants.aggregate([
        {
            $group: {
                _id: "$product_id", 
                countVariants: { $sum: 1 }
            }
        },
        {
            $project: {
                _id: 1, 
                product_id: "$_id",
                countVariants: 1 
            }
        }
    ])
    res.status(200).json({
        success: true,
        message: "variant get  succesfully",
        data: variants
    })
    console.log(variants);
}

const variantparticularproduct = async (req, res) => {
    const variants = await Variants.aggregate([
        {
          $lookup: {
            from: "products",
            localField: "product_id",
            foreignField: "_id",
            as: "productDetails"
          }
        },
        {
          $unwind: "$productDetails"
        },
        // {
        //     $match: {
        //         "productDetails.name": "radishes" 
        //     }
        // },
        {
          $project: {
            _id: 1,
            categori_id: 1,
            subcategori_id: 1,
            product_id: 1,
            price: 1,
            stock: 1,
            discount: 1,
            attributes: 1,
            isActive: 1,
            createdAt: 1,
            updatedAt: 1,
            "productDetails._id": 1,
            "productDetails.name": 1,
            "productDetails.description": 1,
            "productDetails.price": 1,
            "productDetails.stock": 1,
            "productDetails.isActive": 1,
            "productDetails.createdAt": 1,
            "productDetails.updatedAt": 1
          }
        }
      ])
    res.status(200).json({
        success: true,
        message: "variant get  succesfully",
        data: variants
    })

    console.log(variants);
}

const Variantdetails = async (req, res) => {
    const variants = await Variants.aggregate([
      {
        $lookup: {
          from: "products",
          localField: "product_id",
          foreignField: "_id",
          as: "productDetails"
        }
      },
      {
        $unwind: "$productDetails"
      },
      {
        $project: {
          _id: 1,
          categori_id: 1,
          subcategori_id: 1,
          product_id: 1,
          price: 1,
          stock: 1,
          discount: 1,
          attributes: 1,
          isActive: 1,
          createdAt: 1,
          updatedAt: 1,
          "productDetails._id": 1,
          "productDetails.name": 1,
          "productDetails.description": 1,
          "productDetails.price": 1,
          "productDetails.stock": 1,
          "productDetails.isActive": 1,
          "productDetails.createdAt": 1,
          "productDetails.updatedAt": 1
        }
      }
    ])
    res.status(200).json({
      success: true,
      message: "variant get  succesfully",
      data: variants
    })
  
    console.log(variants);
  }


module.exports = {
    countstock,
    activevarint,
    countptoduct,
    variantparticularproduct,
    Variantdetails,
    listVariants,
    getVariant,
    addVariant,
    updateVariant,
    deleteVariant
}
