const express = require('express');
const router = express.Router();
const Entity = require('../model/entity.model'); // Adjust the path if necessary

// Endpoint to get all entities
router.get('/', async (req, res) => {
  try {
    const entities = await Entity.find();
    res.status(200).json(entities);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch entities' });
  }
});

// Endpoint to get a specific entity by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const entity = await Entity.findById(id);
    if (!entity) {
      return res.status(404).json({ message: 'Entity not found' });
    }
    res.status(200).json(entity);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch entity' });
  }
});

module.exports = router;
