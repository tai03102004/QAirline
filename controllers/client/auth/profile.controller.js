const User = require('../models/User'); 
const jwt = require('jsonwebtoken');

// Middleware xác thực token
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).send('Access Denied');

  jwt.verify(token, 'your_secret_key', (err, decoded) => {
    if (err) return res.status(400).send('Invalid Token');
    req.userId = decoded.id;
    next();
  });
};

// Controller để lấy thông tin hồ sơ người dùng
exports.getProfile = (req, res) => {
  const userId = req.userId;

  User.findById(userId, (err, user) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Database error');
    }

    if (!user) {
      return res.status(404).send('User not found');
    }

    res.render('profile', { user: user });
  });
};
