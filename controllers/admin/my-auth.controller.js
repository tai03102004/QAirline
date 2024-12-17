const Account = require("../../models/auth.model");
const schedual = require("../../models/list-flight.model")
const systemConfig = require("../../config/system.js");
const md5 = require("md5");

// [GET] /admin/my-account
module.exports.index = async (req, res) => {
    res.render("admin/pages/my-auth/index.pug", {
        pageTitle: "Thông tin cá nhân",
    })
}

// [GET] /admin/my-account/edit
module.exports.edit = async (req, res) => {
    res.render("admin/pages/my-auth/edit", {
        pageTitle: "Chỉnh sửa thông tin cá nhân",
    });
}

// [PATCH] /admin/my-account/edit
module.exports.editPatch = async (req, res) => {
    if (req.body.password) {
        req.body.password = md5(req.body.password);
    } else {
        delete req.body.password;
    }
    await Account.updateOne({
            _id: res.locals.user.id,
        },
        req.body
    );

    req.flash("success", "Cập nhật tài khoản thành công");
    res.redirect(`/${systemConfig.prefixAdmin}/my-account`);
}