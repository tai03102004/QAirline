const express = require('express');
const router = express.Router();
const loginController = require('../../controllers/client/auth/login.controller'); 

// Trang đăng nhập
router.get('/', loginController.getLoginPage);  

// Xử lý đăng nhập
router.post('/loginaccount', loginController.handleLogin); 

module.exports = router;
