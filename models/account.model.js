const mongoose = require('mongoose');
const generate = require("../helper/generate");
// Client
const accountSchema = new mongoose.Schema({
    name: String,
    name_id: String,
    avatar: String,
    email: String,
    phone: String,
    address: String,
    gender: String,
    password: String,

    tokenUser: {
        type: String,
        default: generate.generateRandomString(31),
    },
    status: {
        type: String,
        default: "active",
    },
    deleted: {
        type: Boolean,
        default: false,
    },
    deletedAt: Date,
}, {
    timestamps: true
});

const Account = mongoose.model('Account', accountSchema, "account");

module.exports = Account;