const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadPath = "uploads";

if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath);
}

const storage = multer.diskStorage({

    destination: function(req, file, cb) {
        cb(null, uploadPath);
    },

    filename: function(req, file, cb) {

        const fileName =
            Date.now() + path.extname(file.originalname);

        cb(null, fileName);

    }

});


const upload = multer({

    storage: storage,

    limits:{
        fileSize: 5 * 1024 * 1024
    },

    fileFilter:function(req,file,cb){

        const allowedFiles = [
            ".pdf",
            ".jpg",
            ".jpeg",
            ".png"
        ];


        const extension =
            path.extname(file.originalname)
            .toLowerCase();


        if(allowedFiles.includes(extension)){

            cb(null,true);

        }else{

            cb(
                new Error(
                    "Only PDF, JPG, JPEG and PNG files allowed"
                )
            );

        }

    }

});


module.exports = upload;