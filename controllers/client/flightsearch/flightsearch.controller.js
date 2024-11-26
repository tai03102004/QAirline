// Giả lập dữ liệu chuyến bay
const Data = require("../../../public/client/js/flightinfo/data");
module.exports.searchFlights = (req, res) => {
    const { departport, arriveport } = req.body;

    console.log(departport, arriveport)

    const matchingFlights = Data.filter(flight =>
        flight.start === departport &&
        flight.end === arriveport
    );

    res.render('client/pages/flightinfo/index.pug', {
        pageTitle: 'Kết quả tìm kiếm chuyến bay',
        flights: matchingFlights,
        departport,
        arriveport
    });
};

module.exports.index = (req, res) => {
    res.render('client/pages/flightsearch/index.pug', {
        pageTitle: "Tim kiem"
    });
}
