const express = require('express');
const router = express.Router();
const flightController = require('../../controllers/client/flightsearch/flightsearch.controller');

router.get('/', flightController.index);
router.get('/search-flights', flightController.searchFlights);
router.get('/passengerinfo', flightController.provideinfo)
router.post('/save-passenger', flightController.savebooking)
router.get('/getairports', flightController.getAllAirports)
router.get('/search-page', (req, res) => {
    res.render('client/pages/flightinfo/index.pug', {
        pageTitle: 'Kết quả tìm kiếm chuyến bay'
    })
})

module.exports = router;
