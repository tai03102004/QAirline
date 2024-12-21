const Account = require('../../../models/account.model');
const jwt = require('jsonwebtoken');
require('dotenv').config(); 

const getRegisterPage = (req, res) => {
  res.render('client/pages/auth/register.pug'); 
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

    // Mã hóa mật khẩu
    const crypto = require('crypto');
    const hashPassword = (password) => {
      return crypto.createHash('md5').update(password).digest('hex');
    };
    const hashedPassword = hashPassword(signupPassword);

    // Tạo tài khoản mới
    const newAccount = new Account({
      name: signupUsername,
      email: signupEmail,
      password: hashedPassword,
    });

    // Lưu tài khoản vào database
    await newAccount.save();

    const jwtSecret = process.env.JWT_SECRET;  
    const token = jwt.sign(
      {
        id: newAccount._id, 
        name: newAccount.name,
        email: newAccount.email
      },
      jwtSecret, 
      { expiresIn: '1h' }  
    );

    // Trả về thông tin tài khoản và token cho client
    res.status(200).json({
      message: 'Đăng ký thành công',
      token: token  
    });

  } catch (error) {
    console.error("Lỗi khi xử lý đăng ký:", error);
    res.status(500).json({ message: 'Đã xảy ra lỗi trong quá trình đăng ký.' });
  }
};

module.exports = {
  getRegisterPage,
  handleSignup,
};
