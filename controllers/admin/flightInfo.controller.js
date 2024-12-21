const FlightInfo = require("../../models/flight-info.model.js");
const paginationHelper = require("../../helper/pagination");
const filterStatusHelper = require("../../helper/filterStatus");
const searchHelper = require("../../helper/search");
const systemConfig = require("../../config/system");

// [GET] / admin/products
module.exports.index = async (req, res) => {
    // try {
    let find = {
        deleted: false,
    };
    // FilterStatus

    const filterStatus = filterStatusHelper(req.query);
    if (req.query.status) {
        find.status = req.query.status;
    }

    // End FilterStatus

    // Sort

    let sort = {};
    if (req.query.sortKey && req.query.sortValue) { // position - desc
        sort[req.query.sortKey] = req.query.sortValue;
    } else {
        sort.position = "desc";
    }

    // End Sort

    // Search(Find) Product

    let objectSearch = searchHelper(req.query);
    if (req.query.keyword) {
        find.title = objectSearch.regex;
    }

    // End Search(Find) Product

    // Pagination

    let initPagination = {
        currentPage: 1, // Trang bắt đầu
        limitItems: 2 // Giới hạn 1 trang 
    }

    const countProducts = await FlightInfo.countDocuments(find); // Tổng sản phẩm
    const objectPagination = paginationHelper(initPagination, req.query, countProducts);

    // End Pagination

    const flightInfo = await FlightInfo.find(find).sort(sort)
        .limit(objectPagination.limitItems) // Giới hạn 1 trang số sản phẩm hiển thị
        .skip(objectPagination.skip); // Bỏ qua sản phẩm sau
    if (FlightInfo.length > 0 || countProducts == 0) {
        res.render("admin/pages/flightInfo/index", {
            pageTitle: "Danh sách chuyến bay",
            flightInfo: flightInfo,
            pagination: objectPagination,
            filterStatus: filterStatus,
            keyword: objectSearch.keyword,
        })
    } else {
        // redirect về trang 1 & stringQuery : Truy vấn tiếp theo (Tìm kiếm sẽ trả về trang 1 ...)
        let stringQuery = "";
        for (const key in req.query) {
            if (key != "page") {
                stringQuery += `&${key}=${req.query[key]}`;
            }
        }
        const href = `${req.baseUrl}?page=1${stringQuery}`;
        res.redirect(href);
    }

    // } catch (err) {
    //     req.flash("error", "Lỗi sản phẩm");
    //     res.redirect("back");
    // }
}


// [DELETE] /admin/products/delete/:id
module.exports.deleteItem = async (req, res) => {
    try {
        const id = req.params.id;
        await Plane.updateOne({
            _id: id
        }, {
            deleted: true,
            deleteBy: {
                // account_id : res.locals.user.id, // để kiểm tra có phải 1 người ko
                deleteAt: new Date(),
            }
        })
        req.flash("success", `Xóa thành công sân bay!`);

        res.redirect("back");
    } catch (err) {
        req.flash("error", "Lỗi khi xoá sân bay");
        res.redirect("back");
    }

}


// [GET] /admin/products/create

module.exports.create = async (req, res) => {
    const id = req.params.id;
    let find = {
        deleted: false,
    }
    // const records = await PetCategory.find(find);
    // const newRecords = createTree(records);
    res.render("admin/pages/products/create", {
        pageTitle: "Tạo mới sân bay",
        // records: newRecords,
    })
}

// [POST] /admin/products/create
module.exports.createPost = async (req, res) => {
    try {
        req.body.price = parseFloat(req.body.price);
        req.body.discountPercentage = parseFloat(req.body.discountPercentage);
        // req.body.stock = parseInt(req.body.stock);
        if (req.body.position == '') {
            const countProducts = await Plane.countDocuments();
            req.body.position = countProducts + 1;
        } else {
            req.body.position = parseInt(req.body.position);
        }

        const plane = new Plane(req.body);
        await plane.save();
        res.redirect(`/${systemConfig.prefixAdmin}/products`);
    } catch (err) {
        res.redirect("back");
        // res.status(403).send('Forbidden: You do not have access to this resource.');
    }
}

module.exports.edit = async (req, res) => {
    try {
        const id = req.params.id;

        const product = await Plane.findOne({
            _id: id,
            deleted: false,
        });

        res.render('admin/pages/products/edit', {
            pageTitle: "Chỉnh sửa tàu bay",
            product: product,
        });
    } catch (err) {
        req.flash("error", "Thông tin sản phẩm không tìm thấy");
        res.redirect(`/${systemConfig.prefixAdmin}/products`);
    }
}

module.exports.editPost = async (req, res) => {
    try {
        const id = req.params.id;
        req.body.price = parseFloat(req.body.price);
        req.body.discountPercentage = parseFloat(req.body.discountPercentage);
        const updateBy = {
            // account_id : res.locals.user.id,
            updateAt: new Date()
        }
        req.body.position = parseInt(req.body.position);

        await Plane.updateOne({
            _id: id,
        }, {
            ...req.body,
            $push: {
                updateBy: updateBy,
            }
        })
        req.flash('success', "Chỉnh sửa sản phẩm thành công");
        res.redirect('back');
    } catch (e) {
        req.flash('error', "Có lỗi xảy ra trong quá trình chỉnh sửa");
    }
}

// /details/:id

module.exports.details = async (req, res) => {
    try {
        const id = req.params.id;

        const plane = await Plane.findOne({
            _id: id,
            deleted: false,
        });

        res.render("admin/pages/products/detail.pug", {
            pageTitle: "Chi tiết sản phẩm",
            plane: plane,
        })
    } catch (err) {
        res.render(`/${systemConfig.prefixAdmin}/products`);
        res.flash("error", "Thông tin sản phẩm gặp vấn đề");
    }
}

module.exports.detailsPatch = async (req, res) => {
    const id = req.params.id;
    const status = req.params.status;
    const updateBy = {
        // account_id : res.locals.user.id, // id người dùng
        updateAt: new Date() // ngày update
    }
    await Plane.updateOne({
        _id: id,
    }, {
        status,
        $push: {
            updateBy: updateBy
        }
    })
    req.flash("success", "Cập nhật trạng thái thành công");
    res.redirect("back");
}