const homeRoutes = require("./home.route");
const contactRoutes = require("./contact.route");

module.exports = (app) => {
    app.use("/", homeRoutes);
    app.use("/contact", contactRoutes);
};