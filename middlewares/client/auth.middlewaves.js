const jwt = require('jsonwebtoken');
const Account = require("../../models/account.model");

module.exports.requireUserAuth = async (req, res, next) => {
  // Kiểm tra token trong cookie
  const token = req.cookies.token;

  if (!token) {
    return res.redirect('/login');  
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);  
    const user = await Account.findById(decoded.id);  

    if (!user) {
      return res.redirect('/login'); 
    }

    res.locals.user = user; 
    next();  
  } catch (err) {
    return res.redirect('/login');  
  }
};
