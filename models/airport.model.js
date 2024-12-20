const mongoose = require("mongoose");

const airportSchema = new mongoose.Schema({
    name: { type: String, required: true },
    province: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    status: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    deleted: { type: Boolean, default: false },
});

const Airport = mongoose.model("airport", airportSchema);

module.exports = Airport;
