const homeRoutes = require("./home.route");
const contactRoutes = require("./contact.route");
const flightInfoRoutes = require("./flight_list.route")
const authMiddleware = require("../../middlewares/client/auth.middlewaves.js");

module.exports = (app) => {
    app.use("/", homeRoutes);
    app.use("/contact", contactRoutes);
    app.use("/flight-information", flightInfoRoutes);
};