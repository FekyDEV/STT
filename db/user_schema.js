const mongoose = require('mongoose');

const user = new mongoose.Schema({
    position: {
        type: Number,
        required: false
    },
    user_id: {
        type: String,
        required: true
    },
    user_name: {
        type: String,
        required: true
    },
    is_admin: {
        type: Boolean,
        required: false,
        default: false
    },
    blacklists: {
        type: Number,
        required: false,
        default: 0
    },
    bdg_h1: {
        type: Boolean,
        required: false,
        default: false
    },
    bdg_h2: {
        type: Boolean,
        required: false,
        default: false
    },
    bdg_h3: {
        type: Boolean,
        required: false,
        default: false
    },
    bdg_verify: {
        type: Boolean,
        required: false,
        default: false
    },
    bdg_dev: {
        type: Boolean,
        required: false,
        default: false
    },
    bdg_early: {
        type: Boolean,
        required: false,
        default: false
    },
    all_reports: {
        type: Number,
        required: false,
        default: 0
    },
    aproved_reports: {
        type: Number,
        required: false,
        default: 0
    },
    denied_reports: {
        type: Number,
        required: false,
        default: 0
    },
    level: {
        type: Number,
        required: false,
        default: 1
    },
    xp: {
        type: Number,
        required: false,
        default: 0
    },
    have_report: {
        type: Boolean,
        required: false,
        default: false
    },
});

module.exports = Item = mongoose.model("user", user);