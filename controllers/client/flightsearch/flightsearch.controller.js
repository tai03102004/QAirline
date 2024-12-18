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
    const { departureLocation, arrivalLocation, departDate, totalpassengers, classchosen } = req.query;
    try {
      let flights
      if (classchosen === 'economyclass') {
        flights = await Flight.find(
          { 
            departureLocation: departureLocation,
            arrivalLocation: arrivalLocation,
            departureTime: { $regex: `^${departDate}` },
            "economySeats.available": { $gte: totalpassengers }
          }
        );
      } else if (classchosen === 'businessclass') {
        flights = await Flight.find(
          { 
            departureLocation: departureLocation,
            arrivalLocation: arrivalLocation,
            departureTime: { $regex: `^${departDate}` },
            "businessSeats.available": { $gte: totalpassengers } 
          });
      } else {
        flights = await Flight.find({
          departureLocation: departureLocation,
          arrivalLocation: arrivalLocation,
          departureTime: { $regex: `^${departDate}` }
        });
      }

      const searchInfo = {
        departureLocation, arrivalLocation, departDate, totalpassengers, classchosen
      }
      
      res.render('client/pages/flightinfo/index.pug', {
        pageTitle: 'Kết quả tìm kiếm chuyến bay',
        flights: flights,
        totalpassengers: totalpassengers,
        searchInfo: searchInfo
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
      const flight = req.body.flight;
      console.log(flight);
      const flightId = flight._id;
      const totalSeats = flight.economySeats.total;
      const allSeats = generateSeatNumbers(totalSeats);
      const bookedSeats = await Booking.find({ flightId }, 'seatNumber').lean();
      const bookedSeatNumbers = bookedSeats.map(booking => booking.seatNumber);
      const availableSeat = allSeats.findIndex(seat => !bookedSeatNumbers.includes(seat));
      console.log(availableSeat);
      if (availableSeat < 0) {
          throw new Error('No available seats for this flight');
      }
      var index = availableSeat;
      const passengers = req.body.passengers;
      passengers.forEach(element => {
        element.seatNumber = allSeats[index];
        element.ticketId = flight._id.substring(flight._id.length - 3) + flight.flightNumber + allSeats[index];
        index++;
        console.log(element.departureTime);
      });
      await Booking.insertMany(passengers);
      res.status(200).send('Passengers saved successfully');
  } catch (error) {
      console.log(error.message);
      res.status(500).send('Error saving passengers: ' + error.message);
  }
}

function generateSeatNumbers(totalSeats) {
  const rows = Math.ceil(totalSeats / 6); // Số hàng (mỗi hàng có 6 ghế)
  const seatLetters = ['A', 'B', 'C', 'D', 'E', 'G'];
  const seats = [];

  for (let i = 1; i <= rows; i++) {
      for (let letter of seatLetters) {
          seats.push(`${i}${letter}`);
      }
  }

  return seats;
}
