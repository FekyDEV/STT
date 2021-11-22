const mongoose = require('mongoose');

const premiumCheck = new mongoose.Schema({
  guildID: { type: String, required: true },
  status: { type: Boolean, default: false, required: true },
});

module.exports = Item = mongoose.model("premiumCheck", premiumCheck);