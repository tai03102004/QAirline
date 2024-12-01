const scheduals = require("../../models/list-flight.model");

// [GET] /admin/index
module.exports.index = async (req, res) => {
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

    // Lấy dữ liệu từ cơ sở dữ liệu
    const schedual = await scheduals.find({});

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
    });
}

// [GET] /admin/detail/:id
module.exports.detail = async (req, res) => {
    res.render("admin/pages/scheduals/detail", {
        pageTitle: "Xem chi tiết chuyến bay",
    });
}