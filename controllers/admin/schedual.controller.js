const Scheduals = require("../../models/list-flight.model");
const paginationHelper = require("../../helper/pagination");
const searchHelper = require("../../helper/search");


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

    // Sort

    let sort = {};
    if (req.query.sortKey && req.query.sortValue) {
        if (req.query.sortKey === 'price') {
            // 1: Tăng dần ; -1: Giảm dần
            // Sắp xếp theo trường lồng nhau economySeats.price
            sort['economySeats.price'] = req.query.sortValue === 'asc' ? 1 : -1;
        } else {
            // Sắp xếp theo các trường khác
            sort[req.query.sortKey] = req.query.sortValue === 'asc' ? 1 : -1;
        }
    } else {
        // Giá trị mặc định (sắp xếp giảm dần theo position)
        sort.position = -1;
    }

    // End Sort

    // Lọc theo status
    if (req.query.status && req.query.status !== '') {
        find.status = req.query.status;
    }

    // Lọc theo flightNumber (tìm kiếm theo regex, không phân biệt chữ hoa/thường)
    if (req.query.flightNumber && req.query.flightNumber.trim() !== '') {
        find.flightNumber = new RegExp(req.query.flightNumber.trim(), 'i');
    }

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

    // Lọc theo giá

    if (req.query.priceStart && req.query.priceEnd) {
        let startPrice = parseInt(req.query.priceStart, 10);
        let endPrice = parseInt(req.query.priceEnd, 10);
        if (!isNaN(startPrice) && !isNaN(endPrice)) {
            if (seatClass === "economy") {
                find["economySeats.price"] = {
                    $gte: startPrice,
                    $lte: endPrice
                };
            } else {
                find["businessSeats.price"] = {
                    $gte: startPrice,
                    $lte: endPrice
                };
            }
        }
    }


    // Pagination

    let initPagination = {
        currentPage: 1, // Trang bắt đầu
        limitItems: 3 // Giới hạn 1 trang 
    }

    const countScheduals = await Scheduals.countDocuments(find); // Tổng sản phẩm
    const objectPagination = paginationHelper(initPagination, req.query, countScheduals);

    // End Pagination


    // Lấy dữ liệu từ cơ sở dữ liệu
    const schedual = await Scheduals.find(find).sort(sort)
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
        status: req.query.status,
        priceStart: req.query.priceStart,
        priceEnd: req.query.priceEnd,
        flightNumber: req.query.flightNumber,
        selectedClass: seatClass,
    });
}

// [GET] /admin/detail/:id
module.exports.detail = async (req, res) => {
    res.render("admin/pages/scheduals/detail", {
        pageTitle: "Xem chi tiết chuyến bay",
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