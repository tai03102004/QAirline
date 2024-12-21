const Account = require('../../../models/account.model');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
require('dotenv').config();

const getLoginPage = (req, res) => {
  res.render('client/pages/auth/login.pug');
};

const handleLogin = async (req, res) => {
  const {
    loginUsername,
    loginPassword
  } = req.body;

  try {
    const account = await Account.findOne({
      name: loginUsername
    });

    if (!account) {
      return res.status(400).json({
        message: 'Tên đăng nhập hoặc mật khẩu không đúng!'
      });
    }

    const hashPassword = (password) => crypto.createHash('md5').update(password).digest('hex');
    const hashedPassword = hashPassword(loginPassword);

    if (hashedPassword !== account.password) {
      return res.status(400).json({
        message: 'Tên đăng nhập hoặc mật khẩu không đúng!'
      });
    }

    const jwtSecret = process.env.JWT_SECRET;
    const token = jwt.sign({
        id: account._id,
        name: account.name,
        email: account.email
      },
      jwtSecret, {
        expiresIn: '1h'
      }
    );

    // Lưu token vào cookie
    res.cookie('token', token, {
      expires: new Date(Date.now() + 3600 * 1000),
      httpOnly: true,
    });

    // Trả thông tin người dùng sau đăng nhập
    return res.status(200).json({
      message: 'Đăng nhập thành công',
      user: {
        name: account.name,
        email: account.email
      },
    });
  } catch (error) {
    console.error('Lỗi đăng nhập:', error);
    return res.status(500).json({
      message: 'Lỗi máy chủ'
    });
  }
};


module.exports = {
  getLoginPage,
  handleLogin,
};