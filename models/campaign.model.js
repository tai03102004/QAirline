const mongoose = require('mongoose');

const airlineInfoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true, // Tiêu đề thông tin (ví dụ: "Giới thiệu về hãng bay", "Khuyến mãi mùa hè")
    },
    type: {
        type: String,
        enum: ["introduction", "promotion", "announcement", "news"], // Loại thông tin
        required: true,
    },
    content: {
        type: String,
        required: true, // Nội dung chi tiết của thông báo
    },
    image: {
        type: String, // URL hoặc tên file hình ảnh đại diện (nếu có)
        default: null,
    },
    startDate: {
        type: Date, // Ngày bắt đầu hiệu lực (đối với khuyến mãi hoặc thông báo)
        default: null,
    },
    endDate: {
        type: Date, // Ngày kết thúc hiệu lực (đối với khuyến mãi hoặc thông báo)
        default: null,
    },
    status: {
        type: String,
        enum: ["active", "inactive"], // Trạng thái hiển thị thông báo
        default: "active",
    },
    priority: {
        type: Number, // Độ ưu tiên (số nhỏ hơn là ưu tiên cao hơn)
        default: 0,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId, // Người tạo thông báo
        ref: "User", // Liên kết đến bảng User
        required: true,
    },
    deleted: {
        type: Boolean,
        default: false, // Đánh dấu thông tin đã bị xóa
    },
    deletedAt: {
        type: Date, // Ngày xóa thông tin
    }
}, {
    timestamps: true, // Tự động tạo createdAt và updatedAt
});

const AirlineInfo = mongoose.model('AirlineInfo', airlineInfoSchema, "airline_info");

module.exports = AirlineInfo;