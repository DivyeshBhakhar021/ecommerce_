const mongoose = require('mongoose');

const categoriesSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            lowercase: true,
            required: true,
            unique: true
        },
        description: {
            type: String,
            trim: true,
            lowercase: true,
            required: true
        },  
        // duraction: {
        //     type: String,
        //     trim: true,
        //     lowercase: true,
        //     required: true
        // },
        // fess: {
        //     type: Number,
        //     trim: true,
        //     lowercase: true,
        //     required: true
        // },
        // image: {
        //     type: String,
        //     trim: true,
        //     lowercase: true
        //     // require: true,
        //     // unique: true
        // },
        is_active: {
            type: Boolean,
            default: true
        }
    }, {
        timestamps: true,
        versionKey: false
    }
)

const Categories = mongoose.model('Categories' , categoriesSchema);
module.exports = Categories;