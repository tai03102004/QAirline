const uploadToCloudinary = require("../../helper/uploadToCloudinary.js");

module.exports.upload = async (req, res, next) => {
    if (req.file) {
        // lấy link ảnh
        const result = await uploadToCloudinary(req.file.buffer);
        console.log(result);
        req.body[req.file.fieldname] = result;

    }
    next();
}