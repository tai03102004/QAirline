const systemConfig = require("../../config/system");

const dashboardRoutes = require("./dashboard.route");
const productRoutes = require("./product.route");
const bookingRoutes = require("./booking.route");
const authRoutes = require("./auth.route");
const schedualRoutes = require("./scheduals.route");
const settingRoutes = require("./setting.route");
const myAccountRoutes = require("./my-auth.route");

const authMiddleware = require("../../middlewares/admin/auth.middlewares");


module.exports = (app) => {
    const PATH_ADMIN = "/" + systemConfig.prefixAdmin;

    app.use(PATH_ADMIN + "/dashboard", authMiddleware.requireAuth, dashboardRoutes);
    app.use(PATH_ADMIN + "/products", authMiddleware.requireAuth, productRoutes);
    app.use(PATH_ADMIN + "/bookings", authMiddleware.requireAuth, bookingRoutes);
    app.use(PATH_ADMIN + "/scheduals", authMiddleware.requireAuth, schedualRoutes);
    app.use(PATH_ADMIN + "/settings", authMiddleware.requireAuth, settingRoutes);
    app.use(PATH_ADMIN + "/my-account", authMiddleware.requireAuth, myAccountRoutes);

    app.use(PATH_ADMIN + "/auth", authRoutes);
};