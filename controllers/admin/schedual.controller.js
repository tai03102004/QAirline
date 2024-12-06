const scheduals = require("../../models/list-flight.model");
const paginationHelper = require("../../helper/pagination");


// [GET] /admin/index
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

    // Pagination

    let initPagination = {
        currentPage: 1, // Trang bắt đầu
        limitItems: 3 // Giới hạn 1 trang 
    }

    const countScheduals = await scheduals.countDocuments(find); // Tổng sản phẩm
    const objectPagination = paginationHelper(initPagination, req.query, countScheduals);

    // End Pagination

    // Sort

    let sort = {};
    if (req.query.sortKey && req.query.sortValue) {
        if (req.query.sortKey === 'price') {
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

    // Lấy dữ liệu từ cơ sở dữ liệu
    const schedual = await scheduals.find(find).sort(sort)
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
    });
}

// [GET] /admin/detail/:id
module.exports.detail = async (req, res) => {
    res.render("admin/pages/scheduals/detail", {
        pageTitle: "Xem chi tiết chuyến bay",
    });
}