const express=require("express");
const router=express.Router();
const {
    verifyToken
}=require("../middleware/authMiddleware");
const {
    getNotifications,
    getUnreadCount,
    markNotificationRead,
    deleteNotification
}=require("../controllers/notificationController");
router.get(
    "/",
    verifyToken,
    getNotifications
);
router.get(
    "/unread-count",
    verifyToken,
    getUnreadCount
);
router.put(
    "/read/:id",
    verifyToken,
    markNotificationRead
);
router.delete(
    "/:id",
    verifyToken,
    deleteNotification
);
module.exports=router;