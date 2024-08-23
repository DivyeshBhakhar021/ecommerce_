const multer = require('multer');
const fs = require("fs");
const path = require('path');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {

      console.log("Ewf",file.fieldname);
      
      // const Path = path.join('public',file.fieldname)

      const Path = path.join('/tmp', file.fieldname)

      fs.mkdir(Path ,{recursive:true},(error)=>{
        if(error) {
          cb(error,null)
        }
        
      })

      cb(null,Path)

      // cb(null, './public/temp')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, uniqueSuffix + '-' + file.originalname)
    }
  })


  const upload = multer({ storage: storage })

  module.exports = upload