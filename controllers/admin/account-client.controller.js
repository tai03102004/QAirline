const Account = require('../../models/account.model');
// const Role = require('../../models/roles.model');
const md5 = require("md5");
const systemConfig = require('../../config/system');
const moment = require('moment');

module.exports.index = async (req, res) => {
    const records = await Account.find({
        deleted: false,
    });
    // for (const record of records) {
    //     const role = await Role.findOne({
    //         _id: record.role_id,
    //     })
    //     record.role = role;
    // }

    res.render("admin/pages/account_client/index", {
        pageTitle: "Tài khoản",
        records: records,
    })
}

// [GET] /admin/pages/account/create
module.exports.create = async (req, res) => {
    const roles = await Role.find({
        deleted: false,
    });

    res.render("admin/pages/account/create", {
        pageTitle: "Thêm mới tài khoản",
        roles: roles,
    })
}

// [POST] /admin/pages/account/createPost
module.exports.createPost = async (req, res) => {
    // password mình nhập vào sẽ random 31 ký tự (dù mình nhập có 5-6 từ)

    req.body.password = (md5)(req.body.password);

    const record = new Account({
        ...req.body,
        deleted: false,
    }, {
        createdAt: new Date(),
    });

    await record.save();

    res.redirect(`/${systemConfig.prefixAdmin}/accounts`);
}

// Kiểm tra và cập nhật trạng thái của các tài khoản sau 10 giây
const checkInactiveAccounts = async () => {
    const oneYearAgo = new Date(Date.now() - (365 * 24 * 60 * 60 * 1000)); // Thời điểm 10 giây trước

    const accounts = await Account.find({
        createdAt: {
            $lte: oneYearAgo
        },
        status: 'active',
    });

    for (const account of accounts) {
        account.status = 'inactive';
        await account.save();
        console.log(`Đã cập nhật trạng thái tài khoản ${account._id} thành inactive`);
    }
};

// Chạy cron job mỗi giây để kiểm tra và cập nhật trạng thái của các tài khoản
setInterval(checkInactiveAccounts, 24 * 60 * 60 * 1000);

// [GET] /admin/accounts/detail

module.exports.detail = async (req, res) => {
    res.render("admin/pages/account/detail", {
        pageTitle: "Thông tin tài khoản",
    })
}

// [GET] /admin/accounts/edit/:id

module.exports.edit = async (req, res) => {
    const roles = await Role.find({
        deleted: false,
    })
    const id = req.params.id;
    const data = await Account.findOne({
        _id: id,
    }, {
        deleted: false,
    })
    res.render("admin/pages/account/edit", {
        pageTitle: "Sửa tài khoản",
        roles: roles,
        data: data,
    })
}

// [PATCH] /admin/accounts/edit/:id

module.exports.editPatch = async (req, res) => {
    const password = req.body.password;
    const id = req.params.id;
    const account = await Account.findOne({
        _id: id,
    }, {
        deleted: false,
    })
    if (password == account.password) {
        req.flash("error", "Mật khẩu này trùng với mật khẩu cũ của ban. Vui lòng đổi lại ");
        res.redirect("back");
    } else {
        if (req.body.password) {
            req.body.password = md5(password);
        } else {
            delete req.body.password;
        }
        await Account.updateOne({
            _id: id,
        }, {
            ...req.body,
        })
        req.flash("success", "Cập nhật tài khoản thành công");
        res.redirect(`/${systemConfig.prefixAdmin}/accounts`);
    }
}