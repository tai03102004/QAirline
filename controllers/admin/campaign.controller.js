const AirlineInfo = require("../../models/campaign.model");
const filterStatusHelper = require("../../helper/filterStatusInfo");
const searchHelper = require("../../helper/search");

// [GET] /admin/campaign
module.exports.index = async (req, res) => {
    let find = {
        deleted: false,
    };
    // FilterStatus

    const filterType = filterStatusHelper(req.query);
    if (req.query.type) {
        find.type = req.query.type;
    }

    // End FilterStatus

    // Sort

    let sort = {};
    if (req.query.sortKey && req.query.sortValue) {
        sort[req.query.sortKey] = req.query.sortValue;
    } else {
        sort = {
            _id: 1
        }; // Sắp xếp ổn định theo _id tăng dần
    }


    // End Sort

    // Search(Find) Product

    let objectSearch = searchHelper(req.query);
    if (req.query.keyword) {
        const regex = objectSearch.regex; // Lấy regex từ helper
        find.$or = [{
            title: regex
        }];
    }

    // End Search(Find) Product

    const infos = await AirlineInfo.find(find).sort(sort);

    res.render("admin/pages/campaign/index", {
        pageTitle: "Trang thông báo",
        infos: infos,
        filterType: filterType,
        keyword: objectSearch.keyword,
    });
}