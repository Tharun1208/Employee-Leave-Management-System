const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
    cloudinary,
    params: async (req, file) => ({
        folder: "employee-leave-documents",
        resource_type: "auto",
        public_id: Date.now() + "-" + file.originalname
    })
});

const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024
    },
    fileFilter(req, file, cb) {

        const allowed = [
            "application/pdf",
            "image/jpeg",
            "image/png",
            "image/jpg"
        ];

        if (allowed.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Only PDF, JPG and PNG files are allowed"));
        }
    }
});

module.exports = upload;