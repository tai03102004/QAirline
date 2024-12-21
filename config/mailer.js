const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.MAIL_USER, 
        pass: process.env.MAIL_PASS, 
    },
});

transporter.verify((error, success) => {
    if (error) {
        console.error("SMTP configuration error:", error);
    } else {
        console.log("SMTP configuration is correct:", success);
    }
});

module.exports = transporter;
