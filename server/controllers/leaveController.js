const db = require("../config/db");

const applyLeave = (req, res) => {
    const {
        leave_type,
        reason,
        start_date,
        end_date
    } = req.body;

    const user_id = req.user.id;

    let document = null;

    if(req.file){
        document = req.file.filename;
    }

    const sql = `
        INSERT INTO leaves
        (
            user_id,
            leave_type,
            leave_type,
            reason,
            start_date,
            end_date,
            document,
            status
        )
        VALUES (?, ?, ?, ?, ?, ?, 'Pending')
    `;

    db.query(
        `
        INSERT INTO leaves
        (
            user_id,
            leave_type,
            reason,
            start_date,
            end_date,
            document,
            status
        )
        VALUES (?, ?, ?, ?, ?, ?, 'Pending')
        `,
        [
            user_id,
            leave_type,
            reason,
            start_date,
            end_date,
            document
        ],
        (err,result)=>{

            if(err){
                return res.status(500).json({
                    message:"Leave application failed",
                    error:err
                });
            }

            const notificationSql = `
                INSERT INTO notifications
                (
                    user_id,
                    message
                )
                VALUES (?,?)
            `;

            db.query(
                notificationSql,
                [
                    2,
                    "New leave request submitted by employee."
                ]
            );

            res.status(200).json({
                message:"Leave applied successfully",
                document:document
            });

        }
    );
};



const getMyLeaves = (req,res)=>{

    const user_id = req.user.id;

    const sql = `
        SELECT
            id,
            leave_type,
            reason,
            start_date,
            end_date,
            document,
            status,
            remarks,
            created_at
        FROM leaves
        WHERE user_id=?
        ORDER BY created_at DESC
    `;

    db.query(
        sql,
        [user_id],
        (err,result)=>{

            if(err){
                return res.status(500).json({
                    message:"Failed to fetch leaves"
                });
            }

            res.json(result);

        }
    );

};



const getAllLeaves = (req,res)=>{

    const sql = `
        SELECT
            leaves.id,
            users.name AS employee_name,
            users.email,
            leaves.leave_type,
            leaves.reason,
            leaves.start_date,
            leaves.end_date,
            leaves.document,
            leaves.status,
            leaves.remarks,
            leaves.created_at
        FROM leaves
        JOIN users
        ON leaves.user_id=users.id
        ORDER BY leaves.created_at DESC
    `;


    db.query(
        sql,
        (err,result)=>{

            if(err){
                return res.status(500).json({
                    message:"Failed to fetch leaves"
                });
            }

            res.json(result);

        }
    );

};



const approveLeave = (req,res)=>{

    const leaveId = req.params.id;

    const {remarks} = req.body;


    db.query(
        `
        SELECT user_id
        FROM leaves
        WHERE id=?
        `,
        [leaveId],
        (err,result)=>{

            if(err){
                return res.status(500).json(err);
            }


            const employeeId=result[0].user_id;


            db.query(
                `
                UPDATE leaves
                SET status='Approved',
                remarks=?
                WHERE id=?
                `,
                [
                    remarks,
                    leaveId
                ],
                (err)=>{

                    if(err){
                        return res.status(500).json(err);
                    }


                    db.query(
                        `
                        INSERT INTO notifications
                        (
                            user_id,
                            message
                        )
                        VALUES (?,?)
                        `,
                        [
                            employeeId,
                            "Your leave request has been approved."
                        ]
                    );


                    res.json({
                        message:"Leave approved successfully"
                    });

                }
            );

        }
    );

};



const rejectLeave = (req,res)=>{

    const leaveId=req.params.id;

    const {remarks}=req.body;


    db.query(
        `
        SELECT user_id
        FROM leaves
        WHERE id=?
        `,
        [leaveId],
        (err,result)=>{

            if(err){
                return res.status(500).json(err);
            }


            const employeeId=result[0].user_id;


            db.query(
                `
                UPDATE leaves
                SET status='Rejected',
                remarks=?
                WHERE id=?
                `,
                [
                    remarks,
                    leaveId
                ],
                (err)=>{

                    if(err){
                        return res.status(500).json(err);
                    }


                    db.query(
                        `
                        INSERT INTO notifications
                        (
                            user_id,
                            message
                        )
                        VALUES (?,?)
                        `,
                        [
                            employeeId,
                            "Your leave request has been rejected."
                        ]
                    );


                    res.json({
                        message:"Leave rejected successfully"
                    });

                }
            );

        }
    );

};



module.exports={
    applyLeave,
    getMyLeaves,
    getAllLeaves,
    approveLeave,
    rejectLeave
};