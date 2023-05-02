const mongoose = require('mongoose');

const sequenceSchema = mongoose.Schema({
  maxDocumentId: { type: String, required: false },
  maxMessageId: { type: String, required: false },
  maxContactId: { type: String, required: false },
});

module.exports = mongoose.model('sequence', sequenceSchema);
