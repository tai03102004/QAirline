const express = require('express');
const router = express.Router();
const loginController = require('../../controllers/client/auth/login.controller');

router.get('/', loginController.getLoginPage);

router.post('/loginaccount', loginController.handleLogin);

module.exports = router;
