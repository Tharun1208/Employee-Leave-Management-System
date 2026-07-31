require("dotenv").config();
const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: {
        rejectUnauthorized: false
    },
    connectTimeout: 60000
});

connection.connect((err) => {
    if (err) {
        console.log("FAILED:");
        console.log(err);
    } else {
        console.log("CONNECTED SUCCESSFULLY");
    }

    connection.end();
});