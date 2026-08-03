const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
    cloudinary,
    params: async (req, file) => {
        console.log("Uploading:", file.originalname);
        console.log("Mime:", file.mimetype);

        return {
            folder: "employee-leave-documents",
            resource_type: "raw"
        };
    }
});

const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024
    }
});

// 👇 ADD THIS ERROR HANDLER
upload.singleWithError = (field) => {
    return (req, res, next) => {
        upload.single(field)(req, res, (err) => {
            if (err) {
                console.log("========== MULTER ERROR ==========");
                console.dir(err, { depth: null });
                return res.status(500).json({
                    success: false,
                    message: err.message,
                    error: err
                });
            }
            next();
        });
    };
};

module.exports = upload;