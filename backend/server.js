const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2");
require("dotenv").config();

const entityRoutes = require("./entityRoutes");

const app = express();
const PORT = 8886;

// Use middlewares
app.use(cors());
app.use(bodyParser.json());

// Connect to MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
  } else {
    console.log("Successfully connected to MySQL");
  }
});

// Pass the database connection to routes
app.use((req, res, next) => {
  req.db = db;
  next();
});

// Use entity routes
app.use("/api/entities", entityRoutes);

// Health check endpoint
app.get("/ping", (req, res) => {
  res.send("pong");
});

// Login endpoint
app.post("/login", (req, res) => {
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ error: "Username is required" });
  }

  // Set the username in a cookie
  res.cookie("username", username, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, // 1-day expiration
  });

  res.status(200).json({ message: "Logged in successfully" });
});

// Logout endpoint
app.post("/logout", (req, res) => {
  // Clear the username cookie
  res.clearCookie("username");

  res.status(200).json({ message: "Logged out successfully" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
