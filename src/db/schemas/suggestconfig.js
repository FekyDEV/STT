const mongoose = require('mongoose');

const suggestConfig = new mongoose.Schema({
  guildID: { type: String, required: true },
  enabled: { type: Boolean, default: false },
  text: { type: String, default: "Thank you for submitting a suggestion!" },
  mainChannel : { type: String, default: null },
  approveChannel : { type: String, default: null },
  denyChannel : { type: String, default: null },
});

module.exports = Item = mongoose.model("suggestConfig", suggestConfig);