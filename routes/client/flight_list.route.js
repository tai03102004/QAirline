const express = require('express');
const router = express.Router();

router.get('/flight-information', (req, res) => {
    res.render('client/pages/flightinfo/flight_list'); 
});

module.exports = router;
