const Account = require('../../../models/account.model')

const getLoginPage = (req, res) => {
    res.render('client/pages/auth/login.pug'); // Render tệp login.pug
  };
  
const handleLogin = async (req, res) => {
    const { loginUsername, loginPassword } = req.body;
    
    const account = await Account.findOne({
      name: loginUsername
    });
    // Xử lý tạm thời
    if (account !== null) {
      const crypto = require('crypto');

      const hashPassword = (password) => {
          return crypto.createHash('md5').update(password).digest('hex');
      };

      const hashedPassword = hashPassword(loginPassword);
      if (hashedPassword === account.password) {      
        console.log("okkk")
        res.status(200).json({message: 'Đăng nhập thành công'});
      } else {
        res.status(400).json({message: 'Tên đăng nhập hoặc mật khẩu không đúng!'});
      }
    } else {
      res.status(400).json({message: 'Tên đăng nhập hoặc mật khẩu không đúng!'});
    }
  }
  
  const handleSignup = async (req, res) => {
    console.log(req.body);
    try {
        const { signupUsername, signupEmail, signupPassword } = req.body;

        const existingAccount = await Account.findOne({
            $or: [
                { name: signupUsername },
                { email: signupEmail }
            ]
        });
        
        if (existingAccount) {
            return res.status(400).json({message: 'Tên đăng nhập hoặc email đã tồn tại!'});
        }
        if (signupPassword.length < 6) {
            return res.status(400).json({message: 'Mật khẩu phải có ít nhất 6 ký tự!'});
        }

        const crypto = require('crypto');

        const hashPassword = (password) => {
            return crypto.createHash('md5').update(password).digest('hex');
        };

        const hashedPassword = hashPassword(signupPassword);

        const newAccount = new Account({
            name: signupUsername,
            name_id: signupUsername,
            email: signupEmail,
            password: hashedPassword 
        });

        await newAccount.save();

        res.status(200).json({message: 'Đăng ký thành công'});
    } catch (error) {
        console.error("Lỗi khi xử lý đăng ký:", error);
        res.status(500).json({message: 'Đã xảy ra lỗi trong quá trình đăng ký.'});
    }
};

  
  module.exports = {
    getLoginPage,
    handleLogin,
    handleSignup
  };