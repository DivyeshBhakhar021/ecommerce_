const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            // required: true,
            trim: true,
            lowercase: true
        },
        email: {
            type: String,
            // required: true,
            trim: true,
            lowercase: true
        },
        password: {
            type: String,
            // required: true
        },
        avtar: {
            type: String
        },
        refretoken :{
            type: String
        },
        accrestoken :{
            type: String
        }, 
        googleId :{
            type: String
        },
        facebookId : {
            type: String
        },
        role: {
            type: String,
            // required: true
        },
        isActive: {
            type: Boolean,
            default: true,
            required: true
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
)
const Users = mongoose.model('Users', usersSchema);

module.exports = Users;