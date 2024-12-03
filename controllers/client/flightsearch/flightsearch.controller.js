// Giả lập dữ liệu chuyến bay
const Data = require("../../../public/client/js/flightinfo/data");
const Flight = require('../../../models/Flights');
const Booking = require('../../../models/booking.model')

module.exports.index = (req, res) => {
    res.render('client/pages/flightsearch/index.pug', {
        pageTitle: "Tim kiem"
    });
}

module.exports.searchFlights = async (req, res) => {
    const { departureLocation, arrivalLocation, departDate, totalpassengers } = req.query;
    try {
      console.log(departDate);

      const flights = await Flight.find({
        departureLocation: departureLocation,
        arrivalLocation: arrivalLocation,
        departureTime: { $regex: `^${departDate}` }
      });
      
      res.render('client/pages/flightinfo/index.pug', {
        pageTitle: 'Kết quả tìm kiếm chuyến bay',
        flights: flights,
        totalpassengers: totalpassengers
      });
    } catch (error) {
      res.status(500).json({ message: 'Lỗi khi lấy dữ liệu chuyến bay', error });
    }
  }

module.exports.provideinfo = async (req, res) => {
    const { passengerNumber, flightNumber } = req.query;

    try {
      const flight = await Flight.findOne({
        flightNumber: flightNumber
      });
      console.log(flight);
      
      if (flight) {
        res.render('client/pages/flightinfo/passengerinfo.pug', {
          pageTitle: 'Kết quả tìm kiếm chuyến bay',
          passengerNumber: passengerNumber,
          flight: flight
        });
      }
    } catch (error) {
      
      res.status(500).json({ message: 'Lỗi khi lấy dữ liệu chuyến bay', error });
    }
}

module.exports.savebooking = async (req, res) => {
  try {
      const passengers = req.body.passengers; // Dữ liệu từ frontend
      await Booking.insertMany(passengers); // Lưu vào MongoDB
      res.status(200).send('Passengers saved successfully');
  } catch (error) {
      res.status(500).send('Error saving passengers: ' + error.message);
  }
}