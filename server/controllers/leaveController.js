const db = require("../config/db");
const path = require("path");

const applyLeave = async (req, res) => {
    try {
        console.log("========== APPLY LEAVE ==========");
        console.log("BODY:", req.body);
        console.log("USER:", req.user);
        console.log("FILE:", req.file);

        const { leave_type, reason, start_date, end_date } = req.body;
        const user_id = req.user.id;

        let document = null;

        if (req.file) {
            document = req.file.filename;

            console.log("Local Upload Success:", document);
        }

        const sql = `
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
        VALUES
        (
            ?, ?, ?, ?, ?, ?, 'Pending'
        )
        `;

        db.query(
            sql,
            [
                user_id,
                leave_type,
                reason,
                start_date,
                end_date,
                document
            ],
            (err) => {

                if (err) {
                    console.error("Leave Insert Error:", err);

                    return res.status(500).json({
                        success:false,
                        message:"Failed to apply leave",
                        error:err.message
                    });
                }

                db.query(
                    `
                    INSERT INTO notifications
                    (
                        user_id,
                        message
                    )
                    VALUES (?, ?)
                    `,
                    [
                        2,
                        "New leave request submitted."
                    ],
                    (notifyErr) => {

                        if (notifyErr) {
                            console.error(
                                "Notification Error:",
                                notifyErr
                            );
                        }

                    }
                );

                return res.status(201).json({
                    success:true,
                    message:"Leave applied successfully",
                    document
                });

            }
        );

    } catch(err) {

        console.error(
            "Local Upload Error:",
            err
        );

        return res.status(500).json({
            success:false,
            message:err.message
        });

    }
};


const getMyLeaves = (req,res) => {

    const user_id = req.user.id;

    db.query(
        `
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
        WHERE user_id = ?
        ORDER BY created_at DESC
        `,
        [user_id],
        (err,result)=>{

            if(err){

                console.error(err);

                return res.status(500).json({
                    message:"Failed to fetch leaves"
                });

            }

            res.json(result);

        }
    );

};


const getAllLeaves = (req,res)=>{

    db.query(
        `
        SELECT
            leaves.id,
            users.employee_id,
            users.name AS employee_name,
            users.email,
            users.department,
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
        ON leaves.user_id = users.id
        ORDER BY leaves.created_at DESC
        `,
        (err,result)=>{

            if(err){

                console.error(err);

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
    const { remarks } = req.body;


    db.query(
        "SELECT user_id FROM leaves WHERE id=?",
        [leaveId],
        (err,result)=>{

            if(err){
                return res.status(500).json(err);
            }


            const employeeId = result[0].user_id;


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
                        message:"Leave Approved Successfully"
                    });

                }
            );

        }
    );

};


const rejectLeave = (req,res)=>{

    const leaveId = req.params.id;
    const { remarks } = req.body;


    db.query(
        "SELECT user_id FROM leaves WHERE id=?",
        [leaveId],
        (err,result)=>{

            if(err){
                return res.status(500).json(err);
            }


            const employeeId = result[0].user_id;


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
                        message:"Leave Rejected Successfully"
                    });

                }
            );

        }
    );

};


module.exports = {
    applyLeave,
    getMyLeaves,
    getAllLeaves,
    approveLeave,
    rejectLeave
};