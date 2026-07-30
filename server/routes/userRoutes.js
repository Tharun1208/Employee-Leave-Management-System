const express = require("express");
const router = express.Router();

const {
    verifyToken,
    verifyManager
} = require("../middleware/authMiddleware");

const {
    getProfile,
    getAllEmployees,
    updateEmployee,
    deleteEmployee
} = require("../controllers/userController");

router.get(
    "/profile",
    verifyToken,
    getProfile
);

router.get(
    "/employees",
    verifyToken,
    verifyManager,
    getAllEmployees
);

router.put(
    "/employees/:id",
    verifyToken,
    verifyManager,
    updateEmployee
);

router.delete(
    "/employees/:id",
    verifyToken,
    verifyManager,
    deleteEmployee
);

module.exports = router;