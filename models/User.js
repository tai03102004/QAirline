// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Định nghĩa schema cho người dùng
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

// Mã hóa mật khẩu trước khi lưu vào cơ sở dữ liệu
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {  // Kiểm tra xem mật khẩu có thay đổi hay không
        try {
            const salt = await bcrypt.genSalt(10);  // Tạo salt với độ dài 10
            const hashedPassword = await bcrypt.hash(this.password, salt);  // Mã hóa mật khẩu
            this.password = hashedPassword;  // Gán mật khẩu đã mã hóa vào đối tượng người dùng
            next();  // Tiếp tục quá trình lưu dữ liệu
        } catch (err) {
            next(err);  // Nếu có lỗi xảy ra, tiếp tục với lỗi
        }
    } else {
        next();  // Nếu mật khẩu không thay đổi, tiếp tục lưu dữ liệu
    }
});

// Phương thức so sánh mật khẩu trong quá trình đăng nhập
userSchema.methods.comparePassword = async function (candidatePassword) {
    try {
        const isMatch = await bcrypt.compare(candidatePassword, this.password);  // So sánh mật khẩu
        return isMatch;
    } catch (err) {
        throw new Error('Error comparing passwords');
    }
};

// Tạo mô hình User từ schema
const User = mongoose.model('User', userSchema);

module.exports = User;
