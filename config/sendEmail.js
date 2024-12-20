const transporter = require("./mailer");

async function sendMail(to, subject, text, html) {
    try {
        const mailOptions = {
            from: `"3Wings Airline" ${process.env.EMAIL_USER}`,
            to,
            subject,
            text,
            html,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent successfully:", info.messageId);
    } catch (error) {
        console.error("Error sending email:", error);
    }
}

module.exports = sendMail