const express = require('express');
const router = express.Router();
const loginController = require('../../controllers/client/auth/login.controller');

// Định nghĩa các route
router.get('/', loginController.getLoginPage);
router.post('/', loginController.handleLogin);

module.exports = router;
