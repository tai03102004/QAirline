const getLoginPage = (req, res) => {
    res.render('client/pages/auth/login.pug'); // Render tệp login.pug
  };
  
  const handleLogin = (req, res) => {
    const { username, password } = req.body;
  
    // Xử lý tạm thời
    if (username === 'admin' && password === 'password') {
      res.send('Đăng nhập thành công!');
    } else {
      res.status(401).send('Tên đăng nhập hoặc mật khẩu không đúng!');
    }
  };
  
  module.exports = {
    getLoginPage,
    handleLogin,
  };
  