const express = require('express');
const router = express.Router();
const loginController = require('../../controllers/client/auth/login.controller');

// Định nghĩa các route
router.get('/', loginController.getLoginPage);
router.post('/loginaccount', loginController.handleLogin);
router.post('/signupaccount', loginController.handleSignup);

module.exports = router;
