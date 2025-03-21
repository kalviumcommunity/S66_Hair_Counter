const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const entityRoutes = require("./entityRoutes");
const authenticateToken = require("./authentication"); // Import the middleware

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

// Protect the entity routes
app.use("/api/entities", authenticateToken, entityRoutes);

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

  // Generate a JWT token
  const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: "1d" });

  // Set the token in a cookie (optional)
  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, // 1-day expiration
  });

  res.status(200).json({ message: "Logged in successfully", token });
});

// Logout endpoint
app.post("/logout", (req, res) => {
  // Clear the token cookie
  res.clearCookie("token");

  res.status(200).json({ message: "Logged out successfully" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
