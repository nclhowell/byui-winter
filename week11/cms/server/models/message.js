const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
  id: { type: String, required: true },
  subject: { type: String, required: false },
  msgText: { type: String, required: false },
  sender: { type: String, required: false },
});

module.exports = mongoose.model('message', messageSchema);
