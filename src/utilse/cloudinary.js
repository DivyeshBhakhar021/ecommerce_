const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY, 
    api_secret: process.env.CLOUD_INARYSECRET
});

const  fileupload = async (filepath,foldername) =>{
    try {
        console.log(process.env.CLOUD_NAME, process.env.CLOUD_KEY, process.env.CLOUD_INARYSECRET);
        
        console.log("filepath,foldername", filepath,foldername);
        
        const uploadResult = await cloudinary.uploader.upload(filepath, {
            folder: foldername,
        }).catch((error)=>{console.log(error)});
        
        console.log(uploadResult);
        
        return uploadResult
        
    } catch (error) {
        console.log("cloudinary error: ", error);
        
    }
}

module.exports = fileupload