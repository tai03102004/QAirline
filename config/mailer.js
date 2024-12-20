const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", // Máy chủ SMTP
    port: 465, // Cổng của Gmail (SSL)
    secure: true, // Sử dụng SSL
    auth: {
        user: process.env.MAIL_USER, // Email (dùng biến môi trường để bảo mật)
        pass: process.env.MAIL_PASS, // Mật khẩu (hoặc App Password)
    },
});

// Kiểm tra kết nối với SMTP (tùy chọn, để kiểm tra config)
transporter.verify((error, success) => {
    if (error) {
        console.error("SMTP configuration error:", error);
    } else {
        console.log("SMTP configuration is correct:", success);
    }
});

module.exports = transporter;
