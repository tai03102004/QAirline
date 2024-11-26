// [GET] /admin/dashboard

const accountAdmin = require("../../models/auth.model");
const planeData = require("../../models/plane-data.model");
const bookings = require("../../models/booking.model");

module.exports.dashboard = async (req, res) => {
    // Thống kế 
    const statistic = {
        // Danh mục tàu bay
        dataPlane: {
            total: 0,
            active: 0,
            inactive: 0,
        },
        // Danh sách đặt vé
        bookings: {
            total: 0,
            active: 0,
            inactive: 0,
        },
        // Tài khoản ADMIN
        account: {
            total: 0,
            active: 0,
            inactive: 0,
        },
        // Người dùng CLIENT
        user: {
            total: 0,
            active: 0,
            inactive: 0,
        },
    };

    // Danh mục tàu bay

    // Đếm tổng số Danh mục tàu bay
    statistic.dataPlane.total = await planeData.countDocuments({
        deleted: false
    });
    // Đếm tài khoản hoạt động
    statistic.dataPlane.active = await planeData.countDocuments({
        status: "active",
        deleted: false
    });
    // Đếm tài khoản ko hoạt động
    statistic.dataPlane.inactive = await planeData.countDocuments({
        status: "inactive",
        deleted: false
    });

    // Danh sách đặt vé
    // Tổng danh sách
    statistic.bookings.total = await bookings.countDocuments({
        deleted: false,
    })
    // Vé xác nhận
    statistic.bookings.confirmed = await bookings.countDocuments({
        status: "Confirmed",
        deleted: false,
    })
    // Vé chờ xác nhận
    statistic.bookings.pending = await bookings.countDocuments({
        status: "Pending",
        deleted: false,
    })
    // Vé huỷ
    statistic.bookings.canceled = await bookings.countDocuments({
        status: "Canceled",
        deleted: false,
    })

    // Tài khoản Admin
    statistic.account.total = await accountAdmin.countDocuments({
        deleted: false,
    })
    // Tài khoản hoạt động
    statistic.account.active = await accountAdmin.countDocuments({
        status: "active",
        deleted: false,
    })
    // Tài khoản dừng hoạt động
    statistic.account.inactive = await accountAdmin.countDocuments({
        status: "inactive",
        deleted: false,
    })

    let find = {
        deleted: false,
    };

    // Tìm bookings
    const allBookings = await bookings.find(find);

    const formatBookingDetails = (bookings) => {
        return bookings.map((ticket) => {
            const validateAndFormatDate = (dateString) => {
                if (dateString && !isNaN(new Date(dateString).getTime())) {
                    const dateObject = new Date(dateString);
                    return {
                        dateObject,
                        formattedDate: new Intl.DateTimeFormat("vi-VN", {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                        }).format(dateObject),
                        formattedTime: new Intl.DateTimeFormat("vi-VN", {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: false,
                            timeZone: "Asia/Ho_Chi_Minh",
                        }).format(dateObject),
                    };
                } else {
                    return {
                        formattedDate: "Invalid Date",
                        formattedTime: "Invalid Time",
                        dateObject: null,
                    };
                }
            };

            // Validate và định dạng thời gian
            const departure = validateAndFormatDate(ticket.departureTime);
            const arrival = validateAndFormatDate(ticket.arrivalTime);

            // Tính duration (chênh lệch thời gian)
            let durationText = "Invalid Duration";
            if (departure.dateObject && arrival.dateObject) {
                const durationMs = arrival.dateObject - departure.dateObject; // Chênh lệch mili giây
                if (durationMs > 0) {
                    const durationHours = Math.floor(durationMs / (1000 * 60 * 60));
                    const durationMinutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
                    durationText = `${durationHours}h ${durationMinutes}m`;
                }
            }

            return {
                ...ticket,
                departureFormattedDate: departure.formattedDate,
                departureFormattedTime: departure.formattedTime,
                arrivalFormattedDate: arrival.formattedDate,
                arrivalFormattedTime: arrival.formattedTime,
                duration: durationText, // Gán giá trị duration
            };
        });
    };


    // Gọi hàm xử lý
    const formattedBookings = formatBookingDetails(allBookings);

    // Render ra view
    res.render("admin/pages/dashboard/index", {
        pageTitle: "Tổng quan",
        statistic: statistic,
        bookings: formattedBookings,
        planeData: planeData,
    });
}