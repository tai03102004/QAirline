const mongoose = require('mongoose');
const generate = require("../helper/generate");
// Admin
const authSchema = new mongoose.Schema({
    name: String,
    name_id: String,
    email: String,
    password: String,
    tokenUser: {
        type: String,
        default: generate.generateRandomString(31),
    },
    status: {
        type: String,
        default: "active",
    },
    avatar: String,
    deleted: {
        type: Boolean,
        default: false,
    },
    deletedAt: Date,
}, {
    timestamps: true
});

const Auth = mongoose.model('Auth', authSchema, "auth");

module.exports = Auth;