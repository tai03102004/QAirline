const express = require('express');
const router = express.Router();
const registerController = require('../../controllers/client/auth/register.controller');

router.get('/', registerController.getRegisterPage);

router.post('/signupaccount', registerController.handleSignup);

module.exports = router;
