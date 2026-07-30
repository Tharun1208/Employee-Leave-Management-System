const db=require("../config/db");
exports.getNotifications=(req,res)=>{
    const user_id=req.user.id;
    const sql=`
        SELECT *
        FROM notifications
        WHERE user_id=?
        ORDER BY created_at DESC
    `;
    db.query(
        sql,
        [user_id],
        (err,result)=>{
            if(err){
                return res.status(500).json({
                    message:"Failed to get notifications",
                    error:err
                });
            }
            res.json(result);
        }
    );
};
exports.getUnreadCount=(req,res)=>{
    const user_id=req.user.id;
    const sql=`
        SELECT COUNT(*) AS count
        FROM notifications
        WHERE user_id=?
        AND is_read=0
    `;
    db.query(
        sql,
        [user_id],
        (err,result)=>{
            if(err){
                return res.status(500).json({
                    message:"Failed to get unread count",
                    error:err
                });
            }
            res.json({
                count:result[0].count
            });
        }
    );
};
exports.markNotificationRead=(req,res)=>{
    const id=req.params.id;
    const sql=`
        UPDATE notifications
        SET is_read=1
        WHERE id=?
    `;
    db.query(
        sql,
        [id],
        (err)=>{
            if(err){
                return res.status(500).json({
                    message:"Failed to update notification",
                    error:err
                });
            }
            res.json({
                message:"Notification marked as read"
            });
        }
    );
};
exports.deleteNotification=(req,res)=>{
    const id=req.params.id;
    const sql=`
        DELETE FROM notifications
        WHERE id=?
    `;
    db.query(
        sql,
        [id],
        (err)=>{
            if(err){
                return res.status(500).json({
                    message:"Failed to delete notification",
                    error:err
                });
            }
            res.json({
                message:"Notification deleted"
            });
        }
    );
};