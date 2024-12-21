const mongoose = require('mongoose');

const flightInfoSchema = new mongoose.Schema({
    flightNumber: {
        type: String,
        required: true,
    },
    flightRoute: {
        type: String,
    },
    departureLocation: {
        type: String,
        required: true,
    },
    arrivalLocation: {
        type: String,
        required: true,
    },
    departureTime: {
        type: String,
        required: true,
    },
    arrivalTime: {
        type: String,
        required: true,
    },
    frequency: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['Scheduled', 'Cancelled', 'Delayed'],
        default: 'Scheduled',
    },
    deleted: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('FlightInfo', flightInfoSchema, 'flight_info');