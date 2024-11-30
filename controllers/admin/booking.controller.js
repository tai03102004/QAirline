const Booking = require("../../models/booking.model");
const paginationHelper = require("../../helper/pagination");
const filterStatusHelper = require("../../helper/filterBookingStatus");
const filterSeatClassHelper = require("../../helper/filterBookingSeatClass");

const searchHelper = require("../../helper/search");

const systemConfig = require("../../config/system");
const moment = require('moment');

// [GET] / admin/products
module.exports.index = async (req, res) => {

    // try {
    let find = {
        deleted: false,
    };
    // FilterStatus

    const filters = filterStatusHelper(req.query); // Gọi helper để lấy cả 2 bộ lọc
    const filterStatus = filters.filterStatus; // Bộ lọc trạng thái
    // Áp dụng lọc trạng thái
    if (req.query.status) {
        find.status = req.query.status;
    }

    // End FilterStatus

    // Filter Set Class
    const filters2 = filterSeatClassHelper(req.query);
    const filterSeatClass = filters2.filterSeatClass;
    // Áp dụng lọc trạng thái
    if (req.query.seatClass) {
        find.seatClass = req.query.seatClass;
    }

    // Pagination

    let initPagination = {
        currentPage: 1, // Trang bắt đầu
        limitItems: 5 // Giới hạn 1 trang 
    }

    const countBookings = await Booking.countDocuments(find); // Tổng sản phẩm
    const objectPagination = paginationHelper(initPagination, req.query, countBookings);

    // End Pagination

    // Search(Find) Product

    let objectSearch = searchHelper(req.query);
    if (req.query.keyword) {
        const regex = objectSearch.regex; // Lấy regex từ helper
        find.$or = [{
                passengerName: regex
            },
            {
                passengerPhone: regex
            },
            {
                flightNumber: regex
            }
        ];
    }

    // End Search(Find) Product

    // Sort

    let sort = {};
    if (req.query.sortKey && req.query.sortValue) { // position - desc
        sort[req.query.sortKey] = req.query.sortValue;
    } else {
        sort.position = "desc";
    }

    // End Sort

    const bookings = await Booking.find(find).sort(sort)
        .limit(objectPagination.limitItems) // Giới hạn 1 trang số sản phẩm hiển thị
        .skip(objectPagination.skip);
    // if (bookings.length > 0 || countBookings == 0) {
    res.render("admin/pages/bookings/index", {
        pageTitle: "Danh sách đặt vé",
        bookings: bookings,
        pagination: objectPagination,
        filterStatus: filterStatus,
        filterSeatClass: filterSeatClass,
        keyword: objectSearch.keyword,
    })

    // } catch (err) {
    //     req.flash("error", "Lỗi đặt vé");
    //     res.redirect("back");
    // }
}

// [DELETE] /admin/products/delete/:id
module.exports.deleteItem = async (req, res) => {
    try {
        const id = req.params.id;
        await Booking.updateOne({
            _id: id
        }, {
            deleted: true,
            deleteBy: {
                // account_id : res.locals.user.id, // để kiểm tra có phải 1 người ko
                deleteAt: new Date(),
            }
        })
        req.flash("success", `Xóa khách hàng thành công!`);

        res.redirect("back");
    } catch (err) {
        req.flash("error", "Lỗi khi xoá khách hàng");
        res.redirect("back");
    }

}

// EDIT
module.exports.edit = async (req, res) => {
    try {
        const id = req.params.id;

        // Tìm kiếm thông tin đặt chỗ dựa vào ID và chưa bị xóa
        const booking = await Booking.findOne({
            _id: id,
            deleted: false,
        });

        if (!booking) {
            req.flash("error", "Thông tin đặt chỗ không tìm thấy");
            return res.redirect(`/${systemConfig.prefixAdmin}/bookings`);
        }

        // Render trang chỉnh sửa với dữ liệu booking
        res.render('admin/pages/bookings/edit', {
            pageTitle: "Chỉnh sửa thông tin đặt chỗ",
            booking: booking,
            moment: moment,
        });
    } catch (err) {
        req.flash("error", "Có lỗi xảy ra khi tìm thông tin đặt chỗ");
        res.redirect(`/${systemConfig.prefixAdmin}/bookings`);
    }
};

module.exports.editPost = async (req, res) => {
    try {
        const id = req.params.id;

        // Chuẩn bị dữ liệu cập nhật
        const updatedData = {
            passengerName: req.body.passengerName,
            flightNumber: req.body.flightNumber,
            seatNumber: req.body.seatNumber,
            passengerEmail: req.body.passengerEmail,
            passengerPhone: req.body.passengerPhone,
            departureTime: req.body.departureTime ? new Date(req.body.departureTime) : req.body.departureTime,
            arrivalTime: req.body.arrivalTime ? new Date(req.body.arrivalTime) : req.body.departureTime,
            departureLocation: req.body.departureLocation,
            arrivalLocation: req.body.arrivalLocation,
            totalAmount: parseFloat(req.body.totalAmount),
            discount: parseFloat(req.body.discount),
            status: req.body.status,
            position: parseInt(req.body.position),
        };

        // Ghi nhận người chỉnh sửa
        const updateBy = {
            // account_id : res.locals.user.id,
            updatedAt: new Date(),
        };

        // Cập nhật thông tin đặt chỗ
        await Booking.updateOne({
            _id: id
        }, {
            ...updatedData,
            $push: {
                updateBy: updateBy
            },
        });

        req.flash('success', "Chỉnh sửa thông tin đặt chỗ thành công");
        res.redirect('back');
    } catch (err) {
        console.error(err);
        req.flash('error', "Có lỗi xảy ra trong quá trình chỉnh sửa");
        res.redirect('back');
    }
};


// /details/:id

module.exports.details = async (req, res) => {
    try {
        const id = req.params.id;

        const booking = await Booking.findOne({
            _id: id,
            deleted: false,
        });

        res.render("admin/pages/bookings/detail.pug", {
            pageTitle: "Chi tiết khách hàng",
            booking: booking,
        })
    } catch (err) {
        res.render(`/${systemConfig.prefixAdmin}/bookings`);
        res.flash("error", "Thông tin khách hàng gặp vấn đề");
    }
}

module.exports.detailsPatch = async (req, res) => {
    const id = req.params.id;
    const status = req.params.status;
    const updateBy = {
        // account_id : res.locals.user.id, // id người dùng
        updateAt: new Date() // ngày update
    }
    await Booking.updateOne({
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