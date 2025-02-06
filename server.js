const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

const routes = require('./routes');  // Import the routes

const app = express();
const PORT = 8886;

app.use(bodyParser.json());

const mongoURL = process.env.MONGO_URI;  

console.log('Mongo URI:', mongoURL);

mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('connected', () => {
  console.log('Successfully connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('Error connecting to MongoDB:', err);
});

app.use('/api/entities', routes);  // Use the routes

app.get('/ping', (req, res) => {
  res.send('pong');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
