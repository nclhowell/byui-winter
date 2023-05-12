const mongoose = require('mongoose');
const documentSchema = mongoose.Schema(
  {
  _id: { type: String, required: false },
  id: { type: String, required: true },
  name: { type: String, required: false },
  description: { type: String, required: false },
  url: { type: String, required: false },
  children: [{type: mongoose.Schema.Types.ObjectId,
    required: false, ref:'Document'}]
}
);
module.exports = mongoose.model('document', documentSchema);
