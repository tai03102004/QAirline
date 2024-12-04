const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema(
  {
    flightNumber: {
      type: String,
      required: true,
      unique: true,
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
    plane: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Plane', // Tham chiếu đến collection Plane (nếu có model riêng)
      required: true,
    },
    economySeats: {
      total: { type: Number, required: true },
      available: { type: Number, required: true },
      price: { type: Number, required: true },
    },
    businessSeats: {
      total: { type: Number, required: true },
      available: { type: Number, required: true },
      price: { type: Number, required: true },
    },
    status: {
      type: String,
      enum: ['Scheduled', 'Cancelled', 'Delayed'], // Các trạng thái hợp lệ
      default: 'Scheduled',
    },
  },
  {
    timestamps: true, // Tự động thêm createdAt và updatedAt
  }
);

module.exports = mongoose.model('Flight', flightSchema, 'list_flights');
