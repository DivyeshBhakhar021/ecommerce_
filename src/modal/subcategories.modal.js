const mongoose = require('mongoose')

const subcategoriesSchema = new mongoose.Schema(
    {
        categoriesid: {
            type: mongoose.Types.ObjectId,
            ref: 'Categories',
            require: true
        },
        name: {
            type: String,
            trim: true,
            lowercase: true,
            require: true,
            unique: true
        },
        description: {
            type: String,
            trim: true,
            lowercase: true,
            require: true
        }, 
        image: {
            type: String,
            trim: true,
            lowercase: true,
            require: true,
            unique: true
        },
        is_active: {
            type: Boolean,
            default: true
        }
    }, {
        timestamps: true,
        versionKey: false
    }
)

const SubCategories = mongoose.model('SubCategories' , subcategoriesSchema);
module.exports = SubCategories;