const mongoose = require('mongoose');

const listFlightSchema = new mongoose.Schema({
    flightNumber: {
        type: String,
        required: true,
        unique: true // Số hiệu chuyến bay phải duy nhất
    },
    departureLocation: {
        type: String,
        required: true // Nơi khởi hành
    },
    arrivalLocation: {
        type: String,
        required: true // Nơi đến
    },
    departureTime: {
        type: Date,
        required: true // Thời gian khởi hành
    },
    arrivalTime: {
        type: Date,
        required: true // Thời gian đến
    },
    plane: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Plane', // Liên kết đến model Plane
        required: true
    },
    economySeats: {
        total: Number, // Tổng số ghế thường
        available: Number, // Số ghế thường còn trống
        price: Number // Giá vé ghế thường
    },
    businessSeats: {
        total: Number, // Tổng số ghế thương gia
        available: Number, // Số ghế thương gia còn trống
        price: Number // Giá vé ghế thương gia
    },
    status: {
        type: String,
        enum: ['Scheduled', 'Canceled', 'Completed'], // Trạng thái chuyến bay
        default: 'Scheduled'
    },
    deleted: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true
});

const ListFlight = mongoose.model('ListFlight', listFlightSchema, 'list_flights');
module.exports = ListFlight;