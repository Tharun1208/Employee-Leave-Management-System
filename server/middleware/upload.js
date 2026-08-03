const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
    cloudinary,
    params: async (req, file) => {
        console.log("Uploading:", file.originalname);
        console.log("Mime Type:", file.mimetype);

        return {
            folder: "employee-leave-documents",
            resource_type: "raw",
            public_id: Date.now().toString()
        };
    }
});

const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024
    }
});

module.exports = upload;