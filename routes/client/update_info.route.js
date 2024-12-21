const express = require('express');
const router = express.Router();
const profileController = require('../../controllers/client/auth/update-info.controller');

router.get('/update-profile', profileController.getProfile);
router.post('/update-profile', profileController.updateProfile);  

module.exports = router;