const mongoose = require('mongoose');
const generate = require("../helper/generate");
// Client
const accountSchema = new mongoose.Schema({
    fullName: String,
    name_id: String,
    email: String,
    phone: String,
    password: String,
    nationality: String,
    gender: String,
    dob: String,
    address: String,
    city: String,
    province: String,
    passport: String,

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