const mongoose = require('mongoose');

const sch = new mongoose.Schema({
  guildID: { type: String, required: true },
  suggestID: { type: String, required: true },
  messageID: {type: String, required: true },
});

module.exports = Item = mongoose.model("sMessage", sch);