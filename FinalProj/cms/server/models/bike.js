const mongoose = require('mongoose');

const bikeSchema = mongoose.Schema({
  id: { type: String, required: false },
  manufacturer: { type: String, required: false },
  model: { type: String, required: false },
  url: { type: String, required: false },
  gender: { type: String, required: false },
  surfaceType: { type: String, required: false },
  terrainLevel: { type: String, required: false },
  terrainType: { type: String, required: false },
  wheelSize: { type: String, required: false },
  funFactor: { type: String, required: false },
});

module.exports = mongoose.model('Bike', bikeSchema);
