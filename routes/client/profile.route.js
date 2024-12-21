const express = require('express');
const router = express.Router();
const profileController = require('../controllers/client/auth/profile.controller');
const authMiddleware = require("../../middlewares/client/auth.middlewaves.js");

router.get('/profile', authMiddleware.requireUserAuth, profileController.getProfile);

module.exports = router;