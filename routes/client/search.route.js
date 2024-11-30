const express = require('express');
const router = express.Router();
const flightController = require('../../controllers/client/flightsearch/flightsearch.controller');

router.get('/', flightController.index);
router.get('/search-flights', flightController.searchFlights);

// API: Lấy danh sách chuyến bay dựa trên điểm khởi hành và điểm đến
// router.post('/flights', flightController.flights);

module.exports = router;
