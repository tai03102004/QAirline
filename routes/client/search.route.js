const express = require('express');
const router = express.Router();
const flightController = require('../../controllers/client/flightsearch/flightsearch.controller');

router.get('/', flightController.index);
router.get('/search-flights', flightController.searchFlights);
router.get('/passengerinfo', flightController.provideinfo)
router.get('/save-passenger', flightController.savebooking)

module.exports = router;
