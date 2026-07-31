const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
    const {
        name,
        email,
        phone,
        department,
        password,
        role
    } = req.body;

    try {
        const checkSql = `
            SELECT *
            FROM users
            WHERE email = ?
        `;

        db.query(checkSql, [email], async (err, result) => {
            if (err) {
                return res.status(500).json({
                    message: "Database Error",
                    error: err
                });
            }

            if (result.length > 0) {
                return res.status(400).json({
                    message: "Email already exists"
                });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const insertSql = `
                INSERT INTO users
                (
                    name,
                    email,
                    phone,
                    department,
                    password,
                    role
                )
                VALUES (?, ?, ?, ?, ?, ?, ?)
            `;

            db.query(
                insertSql,
                [
                    name,
                    email,
                    phone,
                    department,
                    hashedPassword,
                    role || "employee"
                ],
                (err, result) => {
                    if (err) {
                        return res.status(500).json({
                            message: "User registration failed",
                            error: err
                        });
                    }

                    const userRole = role || "employee";
                    const prefix = userRole === "manager" ? "MGR" : "EMP";

                    db.query(
                        `SELECT employee_id
                         FROM users
                         WHERE role = ?
                         ORDER BY employee_id DESC
                         LIMIT 1`,
                        [userRole],
                        (err, rows) => {
                            if (err) {
                                return res.status(500).json({
                                    message: "Employee ID generation failed",
                                    error: err
                                });
                            }

                            let nextNumber = 1;

                            if (rows.length > 0 && rows[0].employee_id) {
                                const lastId = rows[0].employee_id;
                                const lastNumber = parseInt(lastId.substring(3), 10);
                                nextNumber = lastNumber + 1;
                            }

                            const employeeId = prefix + String(nextNumber).padStart(3, "0");

                            db.query(
                                "UPDATE users SET employee_id = ? WHERE id = ?",
                                [employeeId, result.insertId],
                                (err) => {
                                    if (err) {
                                        return res.status(500).json({
                                            message: "Employee ID generation failed",
                                            error: err
                                        });
                                    }

                                    res.status(201).json({
                                        message: "User registered successfully",
                                        employee_id: employeeId
                                    });
                                }
                            );
                        }
                    );
                }
            );
        });
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
};

exports.login = (req, res) => {
    const { email, password } = req.body;

    const sql = `
        SELECT *
        FROM users
        WHERE email = ?
    `;

    db.query(sql, [email], async (err, result) => {
        if (err) {
            return res.status(500).json({
                message: "Database Error",
                error: err
            });
        }

        if (result.length === 0) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const user = result[0];

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(401).json({
                message: "Invalid password"
            });
        }

        const token = jwt.sign(
            {
                id: user.id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user.id,
                employee_id: user.employee_id,
                name: user.name,
                                email: user.email,
                phone: user.phone,
                department: user.department,
                role: user.role
            }
        });
    });
};