const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Database connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "smruti",  // Your MySQL password
    database: "word_game_db"
});

db.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err);
    } else {
        console.log("Connected to MySQL database!");
    }
});

// Signup Route
app.post("/signup", (req, res) => {
    const { username, password } = req.body;

    console.log("Received signup request:", username, password);

    const query = "INSERT INTO users (username, password, score) VALUES (?, ?, 0)";
    db.query(query, [username, password], (err, result) => {
        if (err) {
            console.error("MySQL Error:", err);
            return res.status(500).json({ error: "Signup failed", details: err });
        }

        console.log("User registered successfully:", username);
        res.json({ message: "Signup successful" });
    });
});

// Start the server
app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
