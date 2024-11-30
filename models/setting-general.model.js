const mongoose = require('mongoose');

const settingGeneralSchema = new mongoose.Schema({
    websiteName: String,
    logo: String,
    phone: String,
    email: String,
    address: String,
    copyright: String,
    map: String,
}, {
    timestamps: true, // (createdAt : time tạo product) , (updatedAt : thời gian cập nhật sản phẩm)
});

const SettingGeneral = mongoose.model('SettingGeneral', settingGeneralSchema, "setting-general");

module.exports = SettingGeneral;