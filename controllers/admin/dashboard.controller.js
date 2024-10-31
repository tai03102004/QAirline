// [GET] /admin/dashboard

module.exports.dashboard = async (req, res) => {
    // Thống kế 
    const statistic = {
        // Danh sách sản phẩm
        categoryProduct: {
            total: 0,
            active: 0,
            inactive: 0,
        },
        // Sản phẩm
        petProduct: {
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

    res.render("admin/pages/dashboard/index", {
        pageTitle: "Tổng quan",
        statistic: statistic
    })
}