const express = require('express');
const router = express.Router();
const loginController = require('../../controllers/client/account/login.controller');

// Route hiển thị trang đăng nhập
router.get('/login', (req, res) => {
    res.render('client/pages/auth/login');
});

// Route đăng ký
router.post('/register', loginController.register);

// Route đăng nhập
router.post('/login', loginController.login);

module.exports = router;
