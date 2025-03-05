const mongoose = require('mongoose');

const entitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  created_by: {
    type: mongoose.Schema.Types.ObjectId, // Referencing the User schema
    ref: 'User',
    required: true, // Ensures every entity has a creator
  },
});

const Entity = mongoose.model('Entity', entitySchema);

module.exports = Entity;
