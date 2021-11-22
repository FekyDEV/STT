const mongoose = require('mongoose');

const suggest = new mongoose.Schema({
  guildID: { type: String, required: true },
  suggestID: { type: String, required: true },
  userID: { type: String, required: true },
  userName: { type: String, required: true },
  content: { type: String, required: true },
});

module.exports = Item = mongoose.model('suggest', suggest);