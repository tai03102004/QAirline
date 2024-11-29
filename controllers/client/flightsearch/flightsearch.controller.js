// Giả lập dữ liệu chuyến bay
const Data = require("../../../public/client/js/flightinfo/data");
const Flight = require('../../../models/Flights');
// module.exports.searchFlights = (req, res) => {
//     const { departport, arriveport } = req.body;

//     console.log(departport, arriveport)

//     const matchingFlights = Data.filter(flight =>
//         flight.start === departport &&
//         flight.end === arriveport
//     );

//     res.render('client/pages/flightinfo/index.pug', {
//         pageTitle: 'Kết quả tìm kiếm chuyến bay',
//         flights: matchingFlights,
//         departport,
//         arriveport
//     });
// };

module.exports.index = (req, res) => {
    res.render('client/pages/flightsearch/index.pug', {
        pageTitle: "Tim kiem"
    });
}

module.exports.searchFlights = async (req, res) => {
    const { departureLocation, arrivalLocation } = req.query;
    console.log(departureLocation, arrivalLocation);
    try {
      const flights = await Flight.find({
        departureLocation: departureLocation,
        arrivalLocation: arrivalLocation,
      });

      res.render('client/pages/flightinfo/index.pug', {
        pageTitle: 'Kết quả tìm kiếm chuyến bay',
        flights: flights
    });
    } catch (error) {
      res.status(500).json({ message: 'Lỗi khi lấy dữ liệu chuyến bay', error });
    }
  }