const mongoose = require('mongoose');

const profile = new mongoose.Schema({
  userID: { type: String, required: false },
  name: { type: String, required: false },
  level: { type: Number, required: false },
  verified: { type: Boolean, required: false },
});

module.exports = Item = mongoose.model("profileee", profile);