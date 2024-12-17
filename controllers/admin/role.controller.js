const Role = require("../../models/roles.model");
const systemConfig = require("../../config/system");

// [GET]/admin/roles
module.exports.index = async (req, res) => {
    const records = await Role.find({
        deleted: false,
    });
    res.render("admin/pages/roles/index.pug", {
        pageTitle: "Trang nhóm quyền",
        records: records
    })
}

// [GET]/admin/roles/create
module.exports.create = async (req, res) => {
    res.render("admin/pages/roles/create.pug", {
        pageTitle: "Trang tạo mới nhóm quyền",
    })
}

// [POST] /admin/roles/create

module.exports.createPost = async (req, res) => {
    const record = new Role(req.body);
    await record.save();

    req.flash("success", "Thêm mới nhóm quyền thành công");
    res.redirect(`/${systemConfig.prefixAdmin}/roles`);
}

// [GET] /admin/roles/edit/:id
module.exports.edit = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Role.findOne({
            _id: id,
            deleted: false
        });
        res.render("admin/pages/roles/edit.pug", {
            pageTitle: "Chỉnh sửa nhóm quyền",
            data: data,
        })
    } catch (err) {
        res.redirect(`/${systemConfig.prefixAdmin}/roles`);
    }
}

// [PATCH] /admin/roles/edit/:id
module.exports.editPatch = async (req, res) => {
    const id = req.params.id;

    await Role.updateOne({
        _id: id,
    }, req.body);
    req.flash("success", "Cập nhật nhóm quyền thành công");

    res.redirect("back");
}

// [GET] /admin/roles/permissions
module.exports.permissions = async (req, res) => {
    try {
        const records = await Role.find({
            deleted: false,
        });
        res.render("admin/pages/roles/permission.pug", {
            pageTitle: "Trang phân quyền",
            records: records,
        })
    } catch (err) {
        res.redirect(`/${systemConfig.prefixAdmin}/roles`);
    }
}

// [PATCH] /admin/roles/permissions
module.exports.permissionsPatch = async (req, res) => {

    // fontend sẽ chuyển về String nên BackEnd phải chuyển lại về mảng
    console.log(req.body.permissions);
    const permissions = JSON.parse(req.body.permissions);

    for (const item of permissions) {
        await Role.updateOne({
            _id: item.id,
        }, {
            permissions: item.permissions
        })
    }
    req.flash("success", "Cập nhật phần Phân quyền thành công")
    res.redirect("back");
}

// [GET] /admin/roles/detail

module.exports.detail = async (req, res) => {
    const id = req.params.id;

    const records = await Role.findOne({
        _id: id,
        deleted: false,
    })

    res.render("admin/pages/roles/detail", {
        pageTitle: "Trang xem chi tiết",
        records: records,
    });
}

// [POST] /admin/roles/delete/:id

module.exports.delete = async (req, res) => {
    const id = req.params.id;
    // updateOne(filter, update, options)
    await Role.updateOne({
        _id: id,
    }, {
        deleted: true,
        deletedAt: new Date(),
    })

    req.flash("success", `Xóa thành công sản phẩm!`);

    res.redirect("back");
}