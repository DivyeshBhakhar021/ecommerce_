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
        name: Joi.string().required().max(30).trim().uppercase(),
        description: Joi.string().required().max(100),
    }),
    params: Joi.object().keys({
        category_id: Joi.string().required(),
    }),
};

const deleteCategory = {
    params: Joi.object().keys({
        category_id: Joi.string().required().max(2),
    }),
};

module.exports = {
    createcatrgory,
    getCategory,
    updateCategory,
    deleteCategory,
}