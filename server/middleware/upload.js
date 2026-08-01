const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");
const path = require("path");

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "employee-leave-documents",
        resource_type: "auto",
        allowed_formats: [
            "pdf",
            "jpg",
            "jpeg",
            "png"
        ],
        public_id: (req, file) => {
            return Date.now() + path.parse(file.originalname).name;
        }
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024
    },
    fileFilter: function (req, file, cb) {
        const allowedFiles = [
            ".pdf",
            ".jpg",
            ".jpeg",
            ".png"
        ];

        const extension = path.extname(file.originalname).toLowerCase();

        if (allowedFiles.includes(extension)) {
            cb(null, true);
        } else {
            cb(new Error("Only PDF, JPG, JPEG and PNG files allowed"));
        }
    }
});

module.exports = upload;