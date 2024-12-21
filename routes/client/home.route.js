const express = require('express');
const router = express.Router();

const controller = require("../../controllers/client/home.controller");
const userAuthMiddleware = require('../../middlewares/client/auth.middlewaves'); 

// Route cho trang chủ
router.get("/", controller.index);

router.get("/profile", userAuthMiddleware.requireUserAuth, (req, res) => {
    res.render("client/pages/profile");
});
router.get("/update-profile", userAuthMiddleware.requireUserAuth, (req, res) => {
    res.render("client/pages/auth/update_info"); 
});

const flightController = require('../../controllers/client/flightsearch/flightsearch.controller');
router.get('/search-flights', flightController.searchFlights);
router.get('/passengerinfo', flightController.provideinfo);
router.post('/save-passenger', flightController.savebooking);
router.get('/getairports', flightController.getAllAirports);

module.exports = router;
