const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

const Entity = require('./schema'); 

const app = express();
const PORT = 8886;

app.use(bodyParser.json());

const mongoURL = process.env.MONGO_URI;  
mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('connected', () => {
  console.log('Successfully connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('Error connecting to MongoDB:', err);
});

app.get('/ping', (req, res) => {
  res.send('pong');
});

app.post('/create', async (req, res) => {
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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
