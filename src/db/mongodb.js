const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        .then(()=>{
            console.log("connected to mongodb");
        })
        .catch((error)=>{
            console.log("not connected to mongodb", error);
        })
    } catch (error) {
        
    }
}

module.exports = connectDB;
