// Giả lập dữ liệu chuyến bay
const Data = require("../../../public/client/js/flightinfo/data");
const Flight = require('../../../models/Flights');
const Booking = require('../../../models/booking.model')

function calculateTimeDifference(startTime, endTime) {
  const start = new Date(startTime);
  const end = new Date(endTime);

  const diff = end - start;

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  var time =
    "" +
    (hours != 0 ? `${hours} tiếng ` : "") +
    (minutes != 0 ? `${minutes} phút` : "");

  return time;
}

module.exports.index = (req, res) => {
    res.render('client/pages/flightsearch/index.pug', {
        pageTitle: "Tim kiem"
    });
}

module.exports.searchFlights = async (req, res) => {
    const { departureLocation, arrivalLocation, departDate, totalpassengers, classchosen } = req.query;
    try {
      let sort = {};
      if (req.query.sortKey && req.query.sortValue) {
          if (req.query.sortKey === 'price') {
              // 1: Tăng dần ; -1: Giảm dần
              if (classchosen === 'economy') {
                  sort['economySeats.price'] = req.query.sortValue === 'asc' ? 1 : -1;
              } else {
                  sort['businessSeats.price'] = req.query.sortValue === 'asc' ? 1 : -1;
              }
          } else {
              sort[req.query.sortKey] = req.query.sortValue === 'asc' ? 1 : -1;
          }
      } else {
          sort = {
              _id: 1
          }; // Sắp xếp ổn định theo _id tăng dần
      }

      let flights
      if (classchosen === 'economyclass') {
        flights = await Flight.find(
          { 
            departureLocation: departureLocation,
            arrivalLocation: arrivalLocation,
            departureTime: { $regex: `^${departDate}` },
            "economySeats.available": { $gte: totalpassengers }
          }
        ).sort(sort);
      } else if (classchosen === 'businessclass') {
        flights = await Flight.find(
          { 
            departureLocation: departureLocation,
            arrivalLocation: arrivalLocation,
            departureTime: { $regex: `^${departDate}` },
            "businessSeats.available": { $gte: totalpassengers } 
          }).sort(sort);
      } else {
        flights = await Flight.find({
          departureLocation: departureLocation,
          arrivalLocation: arrivalLocation,
          departureTime: { $regex: `^${departDate}` }
        }).sort(sort);
      }

      if (flights) {
        flights.forEach( (flight) => {
          const duration = calculateTimeDifference(flight.departureTime, flight.arrivalTime);
          flight["duration"] = duration
        })
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
    const { passengerNumber, flightNumber, seatClassChosen } = req.query;
    console.log(seatClassChosen)
    try {
      const flight = await Flight.findOne({
        flightNumber: flightNumber
      });
      
      if (flight) {
        res.render('client/pages/flightinfo/passengerinfo.pug', {
          pageTitle: 'Kết quả tìm kiếm chuyến bay',
          passengerNumber: passengerNumber,
          flight: flight,
          seatClass: seatClassChosen
        });
      }
    } catch (error) {
      
      res.status(500).json({ message: 'Lỗi khi lấy dữ liệu chuyến bay', error });
    }
}

module.exports.savebooking = async (req, res) => {
  try {
      const flight = req.body.flight;
      const flightId = flight._id;
      const totalSeats = flight.economySeats.total;
      const allSeats = generateSeatNumbers(totalSeats);
      const bookedSeats = await Booking.find({ flightId }, 'seatNumber').lean();
      const bookedSeatNumbers = bookedSeats.map(booking => booking.seatNumber);
      const availableSeat = allSeats.findIndex(seat => !bookedSeatNumbers.includes(seat));
      if (availableSeat < 0) {
          throw new Error('No available seats for this flight');
      }
      var index = availableSeat;
      const passengers = req.body.passengers;
      passengers.forEach(element => {
        element.seatNumber = allSeats[index];
        element.ticketId = flight._id.substring(flight._id.length - 3) + flight.flightNumber + allSeats[index];
        index++;
      });
      await Booking.insertMany(passengers);
      if (passengers[0].seatClasa === 'Economy') {
        await Flight.updateOne(
          { _id: flight._id},
          { $inc: { "economySeats.available": -1 * passengers.length } }
        )
      } else {
        await Flight.updateOne(
          { _id: flight._id},
          { $inc: { "businessSeats.available": -1 * passengers.length } }
        )
      }

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
