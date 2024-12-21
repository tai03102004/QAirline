const express = require('express');
const router = express.Router();
const registerController = require('../../controllers/client/auth/register.controller'); 

// Trang đăng ký
router.get('/', registerController.getRegisterPage);  

// Xử lý đăng ký
router.post('/signupaccount', registerController.handleSignup); 

module.exports = router;
