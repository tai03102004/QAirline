const AirlineInfo = require("../../models/campaign.model");
const filterStatusHelper = require("../../helper/filterStatusInfo");
const searchHelper = require("../../helper/search");
const systemConfig = require("../../config/system");


// [GET] /admin/campaign
module.exports.index = async (req, res) => {
    let find = {
        deleted: false,
    };
    // FilterStatus

    const filterType = filterStatusHelper(req.query);
    if (req.query.type) {
        find.type = req.query.type;
    }

    // End FilterStatus

    // Sort

    let sort = {};
    if (req.query.sortKey && req.query.sortValue) {
        sort[req.query.sortKey] = req.query.sortValue;
    } else {
        sort = {
            _id: 1
        }; // Sắp xếp ổn định theo _id tăng dần
    }


    // End Sort

    // Search(Find) Product

    let objectSearch = searchHelper(req.query);
    if (req.query.keyword) {
        const regex = objectSearch.regex; // Lấy regex từ helper
        find.$or = [{
            title: regex
        }];
    }

    // End Search(Find) Product

    const infos = await AirlineInfo.find(find).sort(sort);

    res.render("admin/pages/campaign/index", {
        pageTitle: "Trang thông báo",
        infos: infos,
        filterType: filterType,
        keyword: objectSearch.keyword,
    });
}


// [DELETE] /admin/campaign/delete/:id
module.exports.deleteItem = async (req, res) => {
    try {
        const id = req.params.id;
        await AirlineInfo.updateOne({
            _id: id
        }, {
            deleted: true,
            deleteBy: {
                // account_id : res.locals.user.id, // để kiểm tra có phải 1 người ko
                deleteAt: new Date(),
            }
        })
        req.flash("success", `Xóa thông báo thành công!`);

        res.redirect("back");
    } catch (err) {
        req.flash("error", "Lỗi khi xoá thông báo");
        res.redirect("back");
    }

}

// [GET] /admin/campaign/create

module.exports.create = async (req, res) => {
    const id = req.params.id;
    let find = {
        deleted: false,
    }
    // const records = await PetCategory.find(find);
    // const newRecords = createTree(records);
    res.render("admin/pages/campaign/create", {
        pageTitle: "Tạo mới thông báo",
        // records: newRecords,
    })
}

// [POST] /admin/campaign/create
module.exports.createPost = async (req, res) => {
    try {
        // Chuyển đổi dữ liệu đầu vào
        req.body.priority = parseInt(req.body.priority, 10) || 0;
        req.body.startDate = req.body.startDate ? new Date(req.body.startDate) : null;
        req.body.endDate = req.body.endDate ? new Date(req.body.endDate) : null;

        // Xử lý file upload nếu có
        if (req.file && req.file.filename) {
            req.body.thumbnail = `/uploads/${req.file.filename}`;
        }

        req.body.createdBy = res.locals.user ? res.locals.user.id : null;

        // Tạo mới thông báo
        const airlineInfo = new AirlineInfo(req.body);
        await airlineInfo.save();

        req.flash('success', "Thêm mới thông báo thành công");
        res.redirect(`/${systemConfig.prefixAdmin}/campaign`);
    } catch (err) {
        console.error(err);
        req.flash('error', "Có lỗi xảy ra trong quá trình thêm mới");
        res.redirect("back");
    }
};


module.exports.edit = async (req, res) => {
    try {
        const id = req.params.id;

        const info = await AirlineInfo.findOne({
            _id: id,
            deleted: false,
        });

        res.render('admin/pages/campaign/edit', {
            pageTitle: "Chỉnh sửa thông báo",
            info: info,
        });
    } catch (err) {
        req.flash("error", "Không thể tìm thấy thông báo");
        res.redirect(`/${systemConfig.prefixAdmin}/campaign`);
    }
}

module.exports.editPost = async (req, res) => {
    try {
        const id = req.params.id;

        // Xử lý dữ liệu đầu vào
        req.body.priority = parseInt(req.body.priority, 10);
        req.body.startDate = req.body.startDate ? new Date(req.body.startDate) : null;
        req.body.endDate = req.body.endDate ? new Date(req.body.endDate) : null;

        // Nếu có upload hình ảnh mới
        if (req.file && req.file.filename) {
            req.body.thumbnail = `/uploads/${req.file.filename}`;
        }

        const updateBy = {
            // account_id : res.locals.user.id,
            updateAt: new Date()
        }

        await AirlineInfo.updateOne({
            _id: id,
        }, {
            ...req.body,
            $push: {
                updateBy: updateBy,
            }
        })

        req.flash('success', "Cập nhật thông báo thành công");
        res.redirect('back');
    } catch (error) {
        console.error(error);
        req.flash('error', "Có lỗi xảy ra trong quá trình cập nhật");
        res.redirect('back');
    }
};