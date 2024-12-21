const homeRoutes = require("./home.route");
const contactRoutes = require("./contact.route");
const flightInfoRoutes = require("./flight_list.route")

module.exports = (app) => {
    app.use("/", homeRoutes);
    app.use("/contact", contactRoutes);
    app.use("/flight-information", flightInfoRoutes);
};