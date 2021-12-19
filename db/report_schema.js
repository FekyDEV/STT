const mongoose = require('mongoose');

const report = new mongoose.Schema({
  position: { type: Number, required: false },
  // Report Info
  reportID: { type: String, required: false },
  status: { type: String, required: false, default: "pending" },
  // User Info
  userID: { type: String, required: false, default: "none" },
  // Reported User Info
  reportedUserID: { type: String, required: false, default: "none" },
  reportMessage: { type: String, required: false, default: "none" },
  reportProof: { type: String, required: false, default: "none" },
  reportProof2: { type: String, required: false, default: "none" }, //NO NEEDED
  // Time Info
  timeCreated: { type: String, required: false, default: "none" },
  timeChanged: { type: String, required: false, default: "none" },
  // Admin Info
  admin: { type: String, required: false, default: "none" },
  adminComment: { type: String, required: false, default: "none" },

});

module.exports = Item = mongoose.model("report", report);