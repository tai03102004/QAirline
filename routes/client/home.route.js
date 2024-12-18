const express = require('express');
const router = express.Router();

const controller = require("../../controllers/client/home.controller");

router.get("/", controller.index);

const flightController = require('../../controllers/client/flightsearch/flightsearch.controller');

router.get('/', flightController.index);
router.get('/search-flights', flightController.searchFlights);
router.get('/passengerinfo', flightController.provideinfo)
router.post('/save-passenger', flightController.savebooking)

module.exports = router;