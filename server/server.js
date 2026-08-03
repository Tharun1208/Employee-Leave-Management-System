const express = require("express");
const cors = require("cors");
const fs = require("fs");
require("dotenv").config();

require("./config/db");

const authRoutes = require("./routes/authRoutes");
const leaveRoutes = require("./routes/leaveRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();


// Middleware
app.use(cors());
app.use(express.json());


// Serve uploaded documents
app.use(
    "/uploads",
    express.static("uploads")
);


// Routes
app.use("/api/auth", authRoutes);
app.use("/api/leaves", leaveRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/users", userRoutes);


// Test API
app.get("/", (req, res) => {
    res.send("Employee Leave System Backend Running");
});


// Check uploaded files (temporary testing)
app.get("/check-upload", (req, res) => {

    const uploadPath = "./uploads";

    if (!fs.existsSync(uploadPath)) {

        return res.json({
            success:false,
            message:"Uploads folder not found"
        });

    }


    const files = fs.readdirSync(uploadPath);


    res.json({
        success:true,
        files:files
    });

});


// Global Error Handler
app.use((err, req, res, next) => {

    console.error("========== ERROR ==========");
    console.error(err);


    res.status(err.status || 500).json({

        success:false,
        message:err.message,
        stack:err.stack

    });

});


// Server Port
const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {

    console.log(`Server running on port ${PORT}`);

});