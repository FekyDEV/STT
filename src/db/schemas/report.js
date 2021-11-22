const mongoose = require('mongoose');

const report = new mongoose.Schema({
  guildID: { type: String, required: true },
  id: { type: String, required: true },
  type: { type: String, required: true },
  content: { type: String, required: true },
  rUser: { type: String, required: true },
  rID: { type: String, required: true },
});

module.exports = Item = mongoose.model("report", report);