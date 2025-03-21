const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Entity = require('./schema');
const authenticateToken = require('./authentication'); // Import the middleware

const router = express.Router();

const validateEntity = (data) => {
  const errors = {};
  if (!data.username || data.username.length < 3) {
    errors.username = 'Username must be at least 3 characters long.';
  }
  if (!data.password || data.password.length < 6) {
    errors.password = 'Password must be at least 6 characters long.';
  }
  return errors;
};

// Protected route to create a new entity
router.post('/create', authenticateToken, async (req, res) => {
  const entityData = req.body;
  const errors = validateEntity(entityData);
  if (Object.keys(errors).length > 0) {
    return res.status(400).send({ errors });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    entityData.password = await bcrypt.hash(entityData.password, salt);

    const newEntity = new Entity(entityData);
    await newEntity.save();
    res.status(201).send({ message: 'Entity successfully created', data: newEntity });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Failed to create entity' });
  }
});

// Protected route to fetch all entities
router.get('/', authenticateToken, async (req, res) => {
  try {
    const entities = await Entity.find();
    res.status(200).send({ data: entities });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Failed to fetch entities' });
  }
});

// Protected route to fetch a single entity by ID
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const entity = await Entity.findById(req.params.id);
    if (entity) {
      res.status(200).send({ data: entity });
    } else {
      res.status(404).send({ error: 'Entity not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Failed to fetch entity' });
  }
});

// Protected route to update an entity by ID
router.put('/:id', authenticateToken, async (req, res) => {
  const entityData = req.body;
  const errors = validateEntity(entityData);
  if (Object.keys(errors).length > 0) {
    return res.status(400).send({ errors });
  }

  try {
    const updatedEntity = await Entity.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (updatedEntity) {
      res.status(200).send({ message: 'Entity successfully updated', data: updatedEntity });
    } else {
      res.status(404).send({ error: 'Entity not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Failed to update entity' });
  }
});

// Protected route to delete an entity by ID
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const deletedEntity = await Entity.findByIdAndDelete(req.params.id);
    if (deletedEntity) {
      res.status(200).send({ message: 'Entity successfully deleted' });
    } else {
      res.status(404).send({ error: 'Entity not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Failed to delete entity' });
  }
});

// Protected route to fetch entities by user ID
router.get('/by-user/:userId', authenticateToken, async (req, res) => {
  try {
    const userId = req.params.userId;
    const entities = await Entity.find({ created_by: userId });
    if (entities.length > 0) {
      res.status(200).send({ data: entities });
    } else {
      res.status(404).send({ error: 'No entities found for the specified user' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Failed to fetch entities' });
  }
});

module.exports = router;
