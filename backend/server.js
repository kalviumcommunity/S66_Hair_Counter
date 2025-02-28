const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors"); // Import cors
require("dotenv").config();

const entityRoutes = require("./entityRoutes"); // Import entity routes

const app = express();
const PORT = 8886;

// Use middlewares
app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse incoming JSON requests

// Connect to MongoDB
const mongoURL = process.env.MONGO_URI;

console.log("Mongo URI:", mongoURL);

mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on("connected", () => {
  console.log("Successfully connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
  console.error("Error connecting to MongoDB:", err);
});

// Use entity routes
app.use("/api/entities", entityRoutes); // Mount entity routes under `/api/entities`

// Health check endpoint
app.get("/ping", (req, res) => {
  res.send("pong");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
