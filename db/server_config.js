const mongoose = require('mongoose');

const config = new mongoose.Schema({
    position: {
        type: Number,
        required: false
    },
	sid: {
        type: String,
        required: false
    },
    owner_id: {
        type: String,
        required: false
    },
    premium: {
        type: String,
        required: false,
        default: "false"
    },
    autoban: {
        type: String,
        required: false,
        default: "disable"
    },
    autorole: {
        type: String,
        required: false,
        default: "disable"
    },
    autorole_role: {
        type: String,
        required: false,
        default: "none"
    },
    alt_detection: {
        type: String,
        required: false,
        default: "disable"
    },
    alt_days: {
        type: Number,
        required: false,
        default: "1"
    },
    log_status: {
        type: String,
        required: false,
        default: "disable"
    },
    log_channel: {
        type: String,
        required: false,
        default: "none"
    }
});

module.exports = Item = mongoose.model("config", config);
