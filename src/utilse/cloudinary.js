const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY, 
    api_secret: process.env.CLOUD_INARYSECRET
});

const  fileupload = async (filepath,foldername) =>{
    try {
        const uploadResult = await cloudinary.uploader.upload(filepath, {
            folder: foldername,
        }).catch((error)=>{console.log(error)});
        
        console.log(uploadResult);
        
        return uploadResult
        
    } catch (error) {
        
    }
}

module.exports = fileupload