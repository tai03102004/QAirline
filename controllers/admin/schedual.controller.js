const Scheduals = require("../../models/list-flight.model");
const paginationHelper = require("../../helper/pagination");
const searchHelper = require("../../helper/search");
const systemConfig = require("../../config/system");


// [GET] /admin/scheduals
module.exports.index = async (req, res) => {
    let find = {
        deleted: false,
    }

    // Hàm tính toán duration cho mỗi chuyến bay
    const calculateDuration = (departureTime, arrivalTime) => {
        const departure = new Date(departureTime);
        const arrival = new Date(arrivalTime);

        // Tính chênh lệch thời gian giữa arrivalTime và departureTime
        const durationMs = arrival - departure; // Chênh lệch mili giây
        if (durationMs <= 0) {
            return "Invalid Duration";
        }

        const hours = Math.floor(durationMs / (1000 * 60 * 60)); // Giờ
        const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60)); // Phút
        return `${hours}h ${minutes}m`;
    };

    // Search(Find) Product

    if (req.query.from) {
        let fromRegex = new RegExp(req.query.from, 'i');
        find.departureLocation = fromRegex;
    }

    // Tìm kiếm theo "to" (arrivalLocation)
    if (req.query.to) {
        let toRegex = new RegExp(req.query.to, 'i');
        find.arrivalLocation = toRegex;
    }

    // Tìm kiếm theo ngày (departureTime)
    if (req.query.departureDate) {
        // Giả sử departureDate là 'YYYY-MM-DD'
        let start = new Date(req.query.departureDate);
        let end = new Date(req.query.departureDate);
        end.setDate(end.getDate() + 1); // Tìm trong phạm vi 1 ngày

        find.departureTime = {
            $gte: start,
            $lt: end
        };
    }

    // End Search(Find) Product

    // Tìm kiếm theo seatClass (mặc định là 'economy')
    let seatClass = req.query.seatClass || 'economy'; // Mặc định là economy

    if (seatClass === 'economy') {
        find["economySeats.available"] = {
            $gt: 0
        }; // Chỉ tìm những chuyến có ghế economy còn trống
    } else if (seatClass === 'business') {
        find["businessSeats.available"] = {
            $gt: 0
        }; // Chỉ tìm những chuyến có ghế business còn trống
    }

    // Sort

    let sort = {};

    if (req.query.sortKey && req.query.sortValue) {
        if (req.query.sortKey === 'price') {
            // 1: Tăng dần ; -1: Giảm dần
            if (seatClass === 'economy') {
                sort['economySeats.price'] = req.query.sortValue === 'asc' ? 1 : -1;
            } else {
                sort['businessSeats.price'] = req.query.sortValue === 'asc' ? 1 : -1;
            }
        } else {
            sort[req.query.sortKey] = req.query.sortValue === 'asc' ? 1 : -1;
        }
    } else {
        sort = {
            _id: 1
        }; // Sắp xếp ổn định theo _id tăng dần
    }

    // End Sort


    // Pagination

    let initPagination = {
        currentPage: 1, // Trang bắt đầu
        limitItems: 3 // Giới hạn 1 trang 
    }

    const countScheduals = await Scheduals.countDocuments(find); // Tổng sản phẩm
    const objectPagination = paginationHelper(initPagination, req.query, countScheduals);

    // End Pagination


    // Lấy dữ liệu từ cơ sở dữ liệu
    const schedual = await Scheduals.find(find)
        .sort(sort)
        .limit(objectPagination.limitItems) // Giới hạn 1 trang số sản phẩm hiển thị
        .skip(objectPagination.skip);

    // Thêm trường duration vào mỗi đối tượng trong mảng schedual
    const updatedScheduals = schedual.map(ticket => {
        const duration = calculateDuration(ticket.departureTime, ticket.arrivalTime);
        return {
            ...ticket.toObject(), // Chuyển đổi mongoose document thành plain object
            duration: duration
        };
    });

    // Render trang với dữ liệu đã cập nhật
    res.render("admin/pages/scheduals/index", {
        pageTitle: "Tổng quan",
        schedual: updatedScheduals, // Truyền mảng đã thêm duration vào view
        pagination: objectPagination,
        from: req.query.from,
        to: req.query.to,
        departureDate: req.query.departureDate,
        selectedClass: seatClass,
    });
}

// [GET] /admin/detail/:id
module.exports.detail = async (req, res) => {
    const id = req.params.id;
    const schedule = await Scheduals.findOne({
        _id: id,
        deleted: false,
    });

    res.render("admin/pages/scheduals/detail", {
        pageTitle: "Xem chi tiết chuyến bay",
        schedule: schedule,
    });
}

// [GET] /admin/scheduals/create

module.exports.create = async (req, res) => {
    const id = req.params.id;
    let find = {
        deleted: false,
    }
    // const records = await PetCategory.find(find);
    // const newRecords = createTree(records);
    res.render("admin/pages/scheduals/create", {
        pageTitle: "Thêm lịch bay",
        // records: newRecords,
    })
}

// [POST] /admin/scheduals/create
module.exports.createPost = async (req, res) => {
    // try {
    // Chuyển đổi thời gian sang Date object
    req.body.departureTime = new Date(req.body.departureTime);
    req.body.arrivalTime = new Date(req.body.arrivalTime);

    // Chuyển đổi số ghế và giá sang kiểu số
    const economyTotal = parseInt(req.body.economyTotal, 10);
    const economyPrice = parseFloat(req.body.economyPrice);
    const businessTotal = parseInt(req.body.businessTotal, 10);
    const businessPrice = parseFloat(req.body.businessPrice);

    // Tạo cấu trúc seats
    req.body.economySeats = {
        total: economyTotal,
        price: economyPrice
    };

    req.body.businessSeats = {
        total: businessTotal,
        price: businessPrice
    };

    // Xóa các trường không cần thiết nếu có
    delete req.body.economyTotal;
    delete req.body.economyPrice;
    delete req.body.businessTotal;
    delete req.body.businessPrice;

    // Tạo mới một lịch bay
    const scheduals = new Scheduals(req.body);
    await scheduals.save();

    // Chuyển hướng về trang danh sách lịch bay
    res.redirect(`/${systemConfig.prefixAdmin}/scheduals`);
    // } catch (err) {
    //     console.error(err);
    //     res.redirect("back");
    // }
};

// [GET] /admin/scheduals/edit/:id
module.exports.edit = async (req, res) => {
    try {
        const id = req.params.id;

        // Tìm lịch bay dựa vào ID và chưa bị xóa
        const schedule = await Scheduals.findOne({
            _id: id,
            deleted: false,
        });

        if (!schedule) {
            req.flash("error", "Lịch bay không tồn tại");
            return res.redirect(`/${systemConfig.prefixAdmin}/scheduals`);
        }

        // Render trang chỉnh sửa với dữ liệu lịch bay
        res.render("admin/pages/scheduals/edit", {
            pageTitle: "Chỉnh sửa lịch bay",
            schedule,
        });
    } catch (err) {
        console.error("Lỗi khi lấy lịch bay:", err);
        req.flash("error", "Có lỗi xảy ra khi lấy thông tin lịch bay");
        res.redirect(`/${systemConfig.prefixAdmin}/scheduals`);
    }
};

// [PATCH] /admin/scheduals/edit/:id
module.exports.editPost = async (req, res) => {
    try {
        const id = req.params.id;

        // Chuyển đổi dữ liệu nhận từ form và chuẩn bị dữ liệu cập nhật
        const updatedData = {
            departureTime: req.body.departureTime ? new Date(req.body.departureTime) : undefined,
            arrivalTime: req.body.arrivalTime ? new Date(req.body.arrivalTime) : undefined,
            economySeats: {
                total: parseInt(req.body.economyTotal, 10) || 0,
                price: parseFloat(req.body.economyPrice) || 0,
            },
            businessSeats: {
                total: parseInt(req.body.businessTotal, 10) || 0,
                price: parseFloat(req.body.businessPrice) || 0,
            },
            status: req.body.status,
            updatedAt: new Date(),
        };

        // Xóa các trường undefined để tránh ghi đè sai trong CSDL
        Object.keys(updatedData).forEach(key => {
            if (updatedData[key] === undefined) delete updatedData[key];
        });

        // Cập nhật lịch bay
        const result = await Scheduals.findByIdAndUpdate(id, updatedData, {
            new: true,
        });

        if (!result) {
            req.flash("error", "Lỗi khi cập nhật lịch bay");
            return res.redirect(`/${systemConfig.prefixAdmin}/scheduals`);
        }

        req.flash("success", "Cập nhật lịch bay thành công");
        res.redirect(`/${systemConfig.prefixAdmin}/scheduals`);
    } catch (err) {
        console.error("Lỗi khi cập nhật lịch bay:", err);
        req.flash("error", "Có lỗi xảy ra trong quá trình cập nhật");
        res.redirect("back");
    }
};