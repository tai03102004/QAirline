// Giả lập dữ liệu chuyến bay
const Data = require("../../../public/client/js/flightinfo/data");
const Flight = require('../../../models/Flights');
const Booking = require('../../../models/booking.model')
const sendMail = require('../../../config/sendEmail')
const Airport = require('../../../models/airport.model')

module.exports.getAllAirports = async (req, res) => {
  try {
    const airports = await Airport.find();
    res.status(200).json(airports);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching flight data', error: error.message });
  }
};

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
      const departureCode = (departureLocation.match(/\((.*?)\)/))[1]
      const arrivalCode = (arrivalLocation.match(/\((.*?)\)/))[1]
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
            departureLocation: departureCode,
            arrivalLocation: arrivalCode,
            departureTime: { $regex: `^${departDate}` },
            "economySeats.available": { $gte: totalpassengers }
          }
        ).sort(sort);
      } else if (classchosen === 'businessclass') {
        flights = await Flight.find(
          { 
            departureLocation: departureCode,
            arrivalLocation: arrivalCode,
            departureTime: { $regex: `^${departDate}` },
            "businessSeats.available": { $gte: totalpassengers } 
          }).sort(sort);
      } else {
        flights = await Flight.find({
          departureLocation: departureCode,
          arrivalLocation: arrivalCode,
          departureTime: { $regex: `^${departDate}` }
        }).sort(sort);
      }

      if (flights) {
        flights.forEach( (flight) => {
          const duration = calculateTimeDifference(flight.departureTime, flight.arrivalTime);
          flight["duration"] = duration
        })
      }

      const departAirport = await Airport.findOne({
        code: departureCode
      })

      const arriveAirport = await Airport.findOne({
        code: arrivalCode
      })

      const searchInfo = {
        departureLocation, arrivalLocation, departDate, totalpassengers, classchosen, departAirport, arriveAirport
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
          pageTitle: 'Điền thông tin hành khách',
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
      if (passengers[0].seatClass === 'Economy') {
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

      const departAirport = await Airport.findOne({
        code: flight.departureLocation
      })

      const arriveAirport = await Airport.findOne({
        code: flight.arrivalLocation
      })

      const departDate = new Date(flight.departureTime).toLocaleString('vi-VN')
      const arriveDate = new Date(flight.arrivalTime).toLocaleString('vi-VN')

      console.log(departDate)
  
      await sendMail(
      `Quý khách ${passengers[0].passengerEmail}`,
      `Thông tin chuyến bay ${flight.flightNumber} và ghế ngồi của bạn`,
      `Thông tin chuyến bay ${flight.flightNumber} và ghế ngồi của bạn`,
      generateEmailTemplate(flight, passengers, departAirport, arriveAirport, departDate, arriveDate)
      );
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

function generateEmailTemplate(flightInfo, passengers, departAirport, arriveAirport, departDate, arriveDate) {
  let passengerRows = passengers.map((p) => {
      return `
          <tr>
              <td style="padding: 8px; border: 1px solid #ccc;">${p.passengerName}</td>
              <td style="padding: 8px; border: 1px solid #ccc;">${p.seatNumber}</td>
              <td style="padding: 8px; border: 1px solid #ccc;">${p.ticketId}</td>
          </tr>
      `;
  }).join('');

  return `
  <!DOCTYPE html>
  <html>
  <head>
      <style>
          body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              margin: 0;
              padding: 0;
              background-color: #f9f9f9;
          }
          .container {
              width: 600px;
              margin: 20px auto;
              background-color: #ffffff;
              box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
              border-radius: 5px;
              overflow: hidden;
          }
          .header {
              background-color: #0056b3;
              color: white;
              text-align: center;
              padding: 10px 0;
              font-size: 18px;
              font-weight: bold;
          }
          .content {
              padding: 20px;
          }
          table {
              width: 100%;
              border-collapse: collapse;
          }
          th, td {
              border: 1px solid #ccc;
              padding: 8px;
              text-align: left;
          }
          .footer {
              background-color: #f1f1f1;
              text-align: center;
              padding: 10px;
              font-size: 12px;
              color: #777;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <!-- Header -->
          <div class="header">
              Thông tin chuyến bay của quý khách
          </div>

          <!-- Nội dung chính -->
          <div class="content">
              <p><strong>Chuyến bay:</strong> ${flightInfo.flightNumber}</p>
              <p><strong>Hành trình:</strong> ${departAirport.name} (${departAirport.province}) → ${arriveAirport.name} (${arriveAirport.province})</p>
              <p><strong>Thời gian:</strong> ${departDate} → ${arriveDate}</p>

              <h3>Danh sách hành khách</h3>
              <table>
                  <thead>
                      <tr>
                          <th>Tên hành khách</th>
                          <th>Ghế ngồi</th>
                          <th>Số vé</th>
                      </tr>
                  </thead>
                  <tbody>
                      ${passengerRows}
                  </tbody>
              </table>
          </div>

          <!-- Footer -->
          <div class="footer">
              Đây là email thông báo tự động. Vui lòng không trả lời email này.
          </div>
      </div>
  </body>
  </html>
  `;
}
