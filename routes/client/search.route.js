const express = require('express');
const router = express.Router();
const flightController = require('../../controllers/client/flightsearch/flightsearch.controller');

router.get('/', flightController.index);
router.get('/search-flights', flightController.searchFlights);

module.exports = router;
