const mongoose = require('mongoose');

const slug = require("mongoose-slug-updater");
mongoose.plugin(slug);

const bookingSchema = new mongoose.Schema({
    flightId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ListFlight', // Liên kết đến ListFlight
        required: true
    },
    // Tên của hành khách
    passengerName: {
        type: String,
        required: true
    },
    // Email của hành khách
    passengerEmail: {
        type: String,
        required: true
    },
    // Số điện thoại của hành khách
    passengerPhone: {
        type: String,
        required: true
    },
    // Số hộ chiếu của hành khách (không bắt buộc)
    passportNumber: {
        type: String
    },
    // Số hiệu chuyến bay
    flightNumber: {
        type: String,
        required: true
    },
    // Thời gian khởi hành của chuyến bay
    departureTime: {
        type: Date,
        required: true
    },
    // Thời gian đến nơi của chuyến bay
    arrivalTime: {
        type: Date,
        required: true
    },
    // Địa điểm khởi hành
    departureLocation: {
        type: String,
        required: true
    },
    // Địa điểm đến
    arrivalLocation: {
        type: String,
        required: true
    },
    // Số ghế đã đặt
    seatNumber: {
        type: String,
        required: true
    },
    // Hạng ghế đã đặt (Economy, Business, etc.)
    seatClass: {
        type: String,
        enum: ['Economy', 'Business'], // Ghế thường hoặc thương gia
        required: true
    },
    // Trạng thái đặt vé: Pending, Confirmed, Canceled
    status: {
        type: String,
        enum: ['Pending', 'Confirmed', 'Canceled'],
        default: 'Pending'
    },
    // Phương thức thanh toán (E-Wallet, Credit Card, etc.)
    paymentMethod: {
        type: String
    },
    // Trạng thái thanh toán: Paid hoặc Unpaid
    paymentStatus: {
        type: String,
        enum: ['Paid', 'Unpaid'],
        default: 'Unpaid'
    },
    // Tổng số tiền cho vé
    totalAmount: {
        type: Number,
        required: true
    },
    // Mức giảm giá được áp dụng (nếu có)
    discount: {
        type: Number,
        default: 0
    },
    // Thông tin người tạo (Admin hoặc User)
    createBy: {
        // ID của tài khoản tạo
        accountId: {
            type: String
        },
        // Thời gian tạo đặt chỗ
        createdAt: {
            type: Date,
            default: Date.now
        },
    },
    // Thông tin người xóa (nếu vé bị xóa)
    deleteBy: {
        // ID của tài khoản đã xóa
        accountId: {
            type: String
        },
        // Thời gian xóa đặt chỗ
        deleteAt: {
            type: Date
        },
    },
}, {
    // Tự động thêm các trường `createdAt` và `updatedAt`
    timestamps: true
});

// Tạo model Booking với schema bookingSchema
const Booking = mongoose.model('Booking', bookingSchema, 'bookings');

// Xuất model để sử dụng ở nơi khác
module.exports = Booking;