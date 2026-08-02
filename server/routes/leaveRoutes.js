const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");

const {
    verifyToken,
    verifyManager
} = require("../middleware/authMiddleware");

const {
    applyLeave,
    getMyLeaves,
    getAllLeaves,
    approveLeave,
    rejectLeave
} = require("../controllers/leaveController");


// =============================
// Employee
// =============================

// Apply Leave
router.post(
    "/apply",
    verifyToken,
    upload.single("document"),
    applyLeave
);

// View My Leaves
router.get(
    "/my-leaves",
    verifyToken,
    getMyLeaves
);


// =============================
// Manager
// =============================

// View All Leave Requests
router.get(
    "/all",
    verifyToken,
    verifyManager,
    getAllLeaves
);

// Approve Leave
router.put(
    "/approve/:id",
    verifyToken,
    verifyManager,
    approveLeave
);

// Reject Leave
router.put(
    "/reject/:id",
    verifyToken,
    verifyManager,
    rejectLeave
);

module.exports = router;