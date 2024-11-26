const homeRoutes = require("./search.route");

module.exports = (app) => {
    app.use("/", homeRoutes);
}