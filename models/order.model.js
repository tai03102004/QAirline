const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    // id của người đăng nhập
    // user_id : String,
    // id sản phẩm trong giỏ hàng
    cart_id: String,
    // Thông tin người dùng
    userInfo: {
        fullName: String,
        phone: String,
        address: String,
    },
    // Sản phẩm người dùng
    products: [{
        product_id: String,
        // ko lưu giá mới vì admin có thể thay đổi giá 
        title: String,
        thumbnail: String,
        price: Number,
        slug: String,
        discountPercentage: Number,
        quantity: Number,
    }]
}, {
    timestamps: true,
});

const Order = mongoose.model(
    "Order",
    orderSchema,
    "orders"
);

module.exports = Order;