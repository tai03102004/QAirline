const express = require('express');
const router = express.Router();
const profileController = require('../controllers/client/auth/profile.controller'); 

router.get('/profile', profileController.getProfile);

module.exports = router;
