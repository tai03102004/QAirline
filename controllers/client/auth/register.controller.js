const Account = require('../../../models/account.model');

// Trang đăng ký
const getRegisterPage = (req, res) => {
  res.render('client/pages/auth/register.pug'); // Render trang đăng ký
};

// Xử lý đăng ký
const handleSignup = async (req, res) => {
  const { signupUsername, signupEmail, signupPassword } = req.body;
  try {
    const existingAccount = await Account.findOne({
      $or: [{ name: signupUsername }, { email: signupEmail }],
    });

    if (existingAccount) {
      return res.status(400).json({ message: 'Tên đăng nhập hoặc email đã tồn tại!' });
    }

    if (signupPassword.length < 6) {
      return res.status(400).json({ message: 'Mật khẩu phải có ít nhất 6 ký tự!' });
    }

    const crypto = require('crypto');
    const hashPassword = (password) => {
      return crypto.createHash('md5').update(password).digest('hex');
    };

    const hashedPassword = hashPassword(signupPassword);

    const newAccount = new Account({
      name: signupUsername,
      email: signupEmail,
      password: hashedPassword,
    });

    await newAccount.save();

    res.status(200).json({ message: 'Đăng ký thành công' });
  } catch (error) {
    console.error("Lỗi khi xử lý đăng ký:", error);
    res.status(500).json({ message: 'Đã xảy ra lỗi trong quá trình đăng ký.' });
  }
};

module.exports = {
  getRegisterPage,
  handleSignup,
};
