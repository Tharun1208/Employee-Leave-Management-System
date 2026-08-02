const db = require("../config/db");

const applyLeave = (req, res) => {
    console.log("========== APPLY LEAVE ==========");
    console.log("BODY:", req.body);
    console.log("USER:", req.user);
    console.log("FILE:", req.file);

    const {
        leave_type,
        reason,
        start_date,
        end_date
    } = req.body;

    const user_id = req.user.id;

    let document = null;

    if (req.file) {
        document = req.file.path;
    }

    console.log("DOCUMENT:", document);

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
        (err, result) => {
            if (err) {
                console.log("MYSQL INSERT ERROR:", err);
                return res.status(500).json({
                    message: "Leave application failed",
                    error: err
                });
            }

            console.log("LEAVE INSERTED SUCCESSFULLY");

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
                    "New leave request submitted by employee."
                ],
                (err) => {
                    if (err) {
                        console.log("NOTIFICATION ERROR:", err);
                    } else {
                        console.log("NOTIFICATION INSERTED");
                    }
                }
            );

            res.status(200).json({
                message: "Leave applied successfully",
                document: document
            });
        }
    );
};

const getMyLeaves = (req, res) => {
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
        (err, result) => {
            if (err) {
                console.log("GET MY LEAVES ERROR:", err);
                return res.status(500).json({
                    message: "Failed to fetch leaves"
                });
            }

            res.json(result);
        }
    );
};

const getAllLeaves = (req, res) => {
    db.query(
        `
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
        ON leaves.user_id = users.id
        ORDER BY leaves.created_at DESC
        `,
        (err, result) => {
            if (err) {
                console.log("GET ALL LEAVES ERROR:", err);
                return res.status(500).json({
                    message: "Failed to fetch leaves"
                });
            }

            res.json(result);
        }
    );
};

const approveLeave = (req, res) => {
    const leaveId = req.params.id;
    const { remarks } = req.body;

    db.query(
        `
        SELECT user_id
        FROM leaves
        WHERE id = ?
        `,
        [leaveId],
        (err, result) => {
            if (err) {
                console.log(err);
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
                (err) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).json(err);
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
                            employeeId,
                            "Your leave request has been approved."
                        ]
                    );

                    res.json({
                        message: "Leave approved successfully"
                    });
                }
            );
        }
    );
};

const rejectLeave = (req, res) => {
    const leaveId = req.params.id;
    const { remarks } = req.body;

    db.query(
        `
        SELECT user_id
        FROM leaves
        WHERE id = ?
        `,
        [leaveId],
        (err, result) => {
            if (err) {
                console.log(err);
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
                (err) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).json(err);
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
                            employeeId,
                            "Your leave request has been rejected."
                        ]
                    );

                    res.json({
                        message: "Leave rejected successfully"
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