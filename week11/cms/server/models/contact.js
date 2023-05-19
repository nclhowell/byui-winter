const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
  _id: { type: String, required: true },
  id: { type: String, required: true },
  name: { type: String, required: false },
  email: { type: String, required: false },
  phone: { type: String, required: false },
  imageUrl: { type: String, required: false },
  group: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Contact' }]
});

module.exports = mongoose.model('contact', contactSchema);
