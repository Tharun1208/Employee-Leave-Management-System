const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Tharun1208",
    database: "employee_leave_system"
});

db.connect((err) => {
    if (err) {
        console.log("Database Connection Failed:", err);
    } else {
        console.log("MySQL Database Connected");
    }
});

module.exports = db;