const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            lowercase: true,
            require: true,
            unique: true
        },
        email: {
            type: String,
            trim: true,
            lowercase: true,
            require: true,
            unique: true
        },
        password: {
            type: String,
            trim: true,
            lowercase: true,
            require: true,
            unique: true,
        },
        phone: {
            type: String,
            trim: true,
            lowercase: true,
            require: true,
            unique: true
        },
        address: {
            type: String,
            trim: true,
            lowercase: true,
            require: true
        },
        isActive: {
            type: Boolean,
            default: true
        }    
    },
    {
        timestamps: true,
        versionKey: false
    }
)

const Users = mongoose.model('Users', userSchema);
module.exports = Users