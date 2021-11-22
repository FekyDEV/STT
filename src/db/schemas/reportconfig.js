const mongoose = require('mongoose');

const reportConfig = new mongoose.Schema({
  guildID: { type: String, required: true },
  enabled: { type: Boolean, default: false },
  text: { type: String, default: "Thank you for logging a message!" },
  channel: { type: String, default: null },
  mention: { type: Boolean, default: false },
  mentionRole: { type: String, default: null },
  staffRole: { type: String, default: null },
  ticketCategory: { type: String, default: null },
});

module.exports = Item = mongoose.model("reportConfig", reportConfig);