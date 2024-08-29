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
    body: Joi.object().keys({
        name: Joi.string().required().max(30),
        description: Joi.string().required(),
        // image: Joi.string()
    }),
    params: Joi.object().keys({
        category_id: Joi.string().required()
    })
}

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