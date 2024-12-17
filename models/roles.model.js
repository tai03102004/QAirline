// Trang phân quyền

const mongoose = require("mongoose");

const rolesSchema = new mongoose.Schema({
    title: String,
    description: String,
    permissions: {
        type: Array,
        default: [] // backend nhận đc các tick lưu vào 1 mảng
    }, // lưu các giá trị ("Xem bài viết","Thêm mới bài viết"  , ...)
    deleted: {
        type: Boolean, // true : product đã bị xoá , false : ko
        default: false
    },
    deletedAt: Date, // ghi thời điểm xoá
}, {
    timestamps: true,
});

const Role = mongoose.model("Roles", rolesSchema, "roles");

module.exports = Role;