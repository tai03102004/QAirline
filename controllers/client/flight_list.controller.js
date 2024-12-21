const flightList = require("../../models/flight-info.model.js");

// [GET] /flight-information
module.exports.index = async (req, res) => {
    try {
        let find = {
            deleted: false,
        };

        // Lấy danh sách chuyến bay và nhóm theo flightRoute
        const flights = await flightList.find(find);
        const groupedFlights = flights.reduce((acc, flight) => {
            if (!acc[flight.flightRoute]) {
                acc[flight.flightRoute] = [];
            }
            acc[flight.flightRoute].push(flight);
            return acc;
        }, {});

        res.render("client/pages/flightinfo/flight_list", {
            pageTitle: "THÔNG TIN CHUYẾN BAY",
            groupedFlights: groupedFlights,
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};