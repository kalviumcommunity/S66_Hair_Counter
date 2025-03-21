const express = require("express");
const router = express.Router();
const authenticateToken = require("./authentication"); // Import the middleware

// Protected route to get all entities
router.get("/", authenticateToken, (req, res) => {
  const db = req.db;
  const query = "SELECT * FROM entities";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching entities:", err);
      res.status(500).json({ message: "Error fetching entities" });
    } else {
      res.json(results);
    }
  });
});

// Protected route to get entities by user ID
router.get("/user/:userId", authenticateToken, (req, res) => {
  const db = req.db;
  const userId = req.params.userId;
  const query = "SELECT * FROM entities WHERE created_by = ?";

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error("Error fetching entities for user:", err);
      res.status(500).json({ message: "Error fetching entities for user" });
    } else {
      res.json(results);
    }
  });
});

// Protected route to create a new entity
router.post("/", authenticateToken, (req, res) => {
  const db = req.db;
  const { name, description, created_by } = req.body;
  const query = "INSERT INTO entities (name, description, created_by) VALUES (?, ?, ?)";

  db.query(query, [name, description, created_by], (err, result) => {
    if (err) {
      console.error("Error creating entity:", err);
      res.status(500).json({ message: "Error creating entity" });
    } else {
      res.status(201).json({ id: result.insertId, name, description, created_by });
    }
  });
});

// Protected route to delete an entity by ID
router.delete("/:id", authenticateToken, (req, res) => {
  const db = req.db;
  const id = req.params.id;
  const query = "DELETE FROM entities WHERE id = ?";

  db.query(query, [id], (err) => {
    if (err) {
      console.error("Error deleting entity:", err);
      res.status(500).json({ message: "Error deleting entity" });
    } else {
      res.json({ message: "Entity deleted successfully" });
    }
  });
});

module.exports = router;
