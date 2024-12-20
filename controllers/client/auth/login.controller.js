const Account = require('../../../models/account.model');

// Trang đăng nhập
const getLoginPage = (req, res) => {
  res.render('client/pages/auth/login.pug'); // Render trang đăng nhập
};

// Xử lý đăng nhập
const handleLogin = async (req, res) => {
  const { loginUsername, loginPassword } = req.body;
  const account = await Account.findOne({ name: loginUsername });

  if (account) {
    const crypto = require('crypto');
    const hashPassword = (password) => {
      return crypto.createHash('md5').update(password).digest('hex');
    };
    const hashedPassword = hashPassword(loginPassword);

    if (hashedPassword === account.password) {
      res.status(200).json({ message: 'Đăng nhập thành công' });
    } else {
      res.status(400).json({ message: 'Tên đăng nhập hoặc mật khẩu không đúng!' });
    }
  } else {
    res.status(400).json({ message: 'Tên đăng nhập hoặc mật khẩu không đúng!' });
  }
};

module.exports = {
  getLoginPage,
  handleLogin,
};
