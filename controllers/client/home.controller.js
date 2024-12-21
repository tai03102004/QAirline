const AirlineInfo = require("../../models/campaign.model");


// [GET] /
module.exports.index = async (req, res) => {
    let find = {
        deleted: false,
    };

    const infos = await AirlineInfo.find(find);

    res.render('client/pages/home/index.pug', {
        pageTitle: "Home",
        infos: infos,
    })
}