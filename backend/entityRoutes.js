const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Define the entity schema
const entitySchema = new mongoose.Schema({
    name: String, // Add any other fields as needed
});

const Entity = mongoose.model("Entity", entitySchema);

// Fetch all entities
router.get("/", async (req, res) => {
    try {
        const entities = await Entity.find();
        res.status(200).json(entities);
    } catch (error) {
        res.status(500).json({ message: "Error fetching entities", error });
    }
});

// Add a new entity
router.post("/", async (req, res) => {
    try {
        const newEntity = new Entity(req.body);
        await newEntity.save();
        res.status(201).json(newEntity);
    } catch (error) {
        res.status(500).json({ message: "Error adding entity", error });
    }
});

// Update an existing entity
router.put("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const updatedEntity = await Entity.findByIdAndUpdate(id, req.body, {
            new: true, // Return the updated document
        });
        if (!updatedEntity) {
            return res.status(404).json({ message: "Entity not found" });
        }
        res.status(200).json(updatedEntity);
    } catch (error) {
        res.status(500).json({ message: "Error updating entity", error });
    }
});

// Delete an entity
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const deletedEntity = await Entity.findByIdAndDelete(id);
        if (!deletedEntity) {
            return res.status(404).json({ message: "Entity not found" });
        }
        res.status(200).json({ message: "Entity deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting entity", error });
    }
});

module.exports = router;
