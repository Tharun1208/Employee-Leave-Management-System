const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
    const {
        name,
        username,
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
                    username,
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
                    username,
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

                    const prefix = (role || "employee") === "manager"
                        ? "MGR"
                        : "EMP";

                    const employeeId =
                        prefix + String(result.insertId).padStart(3, "0");

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

        const match = await bcrypt.compare(
            password,
            user.password
        );

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
                username: user.username,
                email: user.email,
                phone: user.phone,
                department: user.department,
                role: user.role
            }
        });
    });
};

