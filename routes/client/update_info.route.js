const express = require('express');
const router = express.Router();
const updateProfileController = require('../../controllers/client/auth/profile.controller');

router.put('/profile', updateProfileController.updateProfile);

module.exports = router;
