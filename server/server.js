const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

require("./config/db");

const authRoutes = require("./routes/authRoutes");
const leaveRoutes = require("./routes/leaveRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(cors());
app.use(express.json());


// Serve uploaded files
app.use(
    "/uploads",
    express.static(path.join(__dirname, "uploads"))
);


app.use("/api/auth", authRoutes);
app.use("/api/leaves", leaveRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/users", userRoutes);


app.get("/", (req, res) => {
    res.send("Employee Leave System Backend Running");
});


app.listen(process.env.PORT || 5000, () => {
    console.log(`Server running on port ${process.env.PORT || 5000}`);
});