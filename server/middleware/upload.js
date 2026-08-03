const multer = require("multer");
const path = require("path");


const storage = multer.diskStorage({

    destination:function(req,file,cb){
        cb(null,"uploads/");
    },


    filename:function(req,file,cb){

        const uniqueName =
        Date.now() + "-" + file.originalname;

        cb(null,uniqueName);

    }

});


const upload = multer({

    storage:storage,

    limits:{
        fileSize:5 * 1024 * 1024
    },


    fileFilter:function(req,file,cb){

        const allowed=[
            ".pdf",
            ".jpg",
            ".jpeg",
            ".png"
        ];


        const ext =
        path.extname(file.originalname)
        .toLowerCase();


        if(allowed.includes(ext)){

            cb(null,true);

        }
        else{

            cb(
              new Error(
              "Only PDF, JPG, JPEG and PNG files are allowed"
              )
            );

        }

    }

});


module.exports = upload;