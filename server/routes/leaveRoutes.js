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

router.post(
    "/apply",
    verifyToken,
    upload.single("document"),
    applyLeave
);

router.get(
    "/my-leaves",
    verifyToken,
    getMyLeaves
);

router.get(
    "/all",
    verifyToken,
    verifyManager,
    getAllLeaves
);

router.put(
    "/approve/:id",
    verifyToken,
    verifyManager,
    approveLeave
);

router.put(
    "/reject/:id",
    verifyToken,
    verifyManager,
    rejectLeave
);

module.exports = router;