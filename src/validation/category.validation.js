const Joi = require('joi');

const getCategory = {
    query: Joi.object().keys({
        cat_id: Joi.string().required(),
    }),
};

const createcatrgory = {
    body: Joi.object().keys({
        name: Joi.string().required(),
        description: Joi.string().required()

    })
}

const updateCategory = {
    body: Joi.object().keys({// Assuming ObjectId
        _id: Joi.string().length(24).required(),
        name: Joi.string().required().max(30).trim().uppercase(),            // Required field
        description: Joi.string().required().max(100).optional(),     // Optional field
        is_active: Joi.boolean().optional(),      // Optional field
        createdAt: Joi.date().optional(),         // Optional field
        updatedAt: Joi.date().optional()  

    }),
    params: Joi.object().keys({ 
        category_id: Joi.string().length(24).required(),
    }),
};

const deleteCategory = {
    params: Joi.object().keys({
        category_id: Joi.string().required().max(240),
    }),
};

module.exports = {
    createcatrgory,
    getCategory,
    updateCategory,
    deleteCategory,
}