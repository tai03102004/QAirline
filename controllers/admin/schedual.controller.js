const scheduals = require("../../models/list-flight.model");

// [GET] /admin/index

module.exports.index = async (req, res) => {
    const schedual = await scheduals.find();
    res.render("admin/pages/scheduals/index", {
        pageTitle: "Tổng quan",
        schedual: schedual,
    });
}