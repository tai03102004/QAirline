const Account = require("../../models/auth.model");
// Để mã hoá mật khẩu
const md5 = require("md5");
const systemConfig = require("../../config/system");

// [GET] /admin/auth/login
module.exports.login = async (req, res) => {
    res.render("admin/pages/auth/login.pug", {
        pageTitle: "Đăng nhập",
    });
}

// [POST] /admin/auth/login
module.exports.loginPost = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const user = await Account.findOne({
        email: email,
        deleted: false,
    });

    if (!user) {
        req.flash("error", "Tài khoản không tồn tại");
        res.redirect("back");
        return;
    }
    // mật khẩu sau khi đã mã hoá != mật khẩu database
    if (md5(password) != user.password) {
        req.flash("error", "Sai mật khẩu");
        res.redirect("back");
        return;
    }
    // trạng thái hoạt động phải là active
    if (user.status == "inactive") {
        req.flash("error", "Tài khoản đang bị khoá");
        res.redirect("back");
        return;
    }
    // token sẽ lưu vào cookie để người dùng khi đăng nhập sẽ ko bị out ra khi vào lại
    res.cookie("token", user.tokenUser, {
        expires: new Date(Date.now() + 90000000)
    });
    // Khi đăng nhập thành công sẽ chuyển sang trang dashboard
    res.redirect(`/${systemConfig.prefixAdmin}/dashboard`);
}

// [GET] /admin/auth/logout

module.exports.logout = async (req, res) => {
    // khi đăng xuất token sẽ mất 
    res.clearCookie("token");
    res.redirect(`/${systemConfig.prefixAdmin}/auth/login`);
}