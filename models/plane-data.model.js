const mongoose = require('mongoose');

const slug = require("mongoose-slug-updater");
mongoose.plugin(slug);

const planeSchema = new mongoose.Schema({
    title: String, // Mã
    manufacturer: String, // Hãng sản xuất
    descrpition: String, // Thông tin về các ghế
    price: Number, // Gía vẽ 
    discountPercentage: Number, // Giảm giá
    stock: Number, // Số lượng 
    thumbnail: String,
    status: String, // Trạng thái -> Hoạt động or Không hoạt động
    featured: String, // Sản phẩm nổi bật tương ứng vs 1
    position: Number, // Vị trí

    slug: {
        type: String, // slug là 1 chuỗi
        slug: "title", // slug : a-b
        unique: true // ko thể cài 2 giá trị slug có cùng tên
    },
    deleted: {
        type: Boolean,
        default: false,
    },
    createBy: {
        account_id: String,
        createAt: {
            type: Date,
            default: Date.now // Chỉ lấy khi tạo sản phẩm
        }
    },
    deleteBy: {
        account_id: String, // id sản phẩm = id tài khoản
        deleteAt: Date // Ngày xoá lưu vào database
    },
    // 1 mảng sản phẩm
    updateBy: [{
        account_id: String, // id Người dùng
        updateAt: Date // Ngày update
    }]
    // { timestamps: true } // nó sẽ tạo ra 2 trường (createdAt : time tạo product) , (updatedAt : thời gian cập nhật sản phẩm)
});

const Plane = mongoose.model("Plane", planeSchema, "planes");

module.exports = Plane;