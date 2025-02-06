const express = require('express');
const Entity = require('./schema');

const router = express.Router();

router.post('/create', async (req, res) => {
  const entityData = req.body;
  try {
    const newEntity = new Entity(entityData);
    await newEntity.save();
    res.status(201).send({ message: 'Entity successfully created', data: newEntity });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Failed to create entity' });
  }
});
router.get('/', async (req, res) => {
  try {
    const entities = await Entity.find();
    res.status(200).send({ data: entities });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Failed to fetch entities' });
  }
});
router.get('/:id', async (req, res) => {
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

router.put('/:id', async (req, res) => {
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

router.delete('/:id', async (req, res) => {
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

module.exports = router;
