const { User } = require('./models/User');
const jwt = require('jsonwebtoken');
const secret = 'abc123';
module.exports = (req, res, next) => {
  let token = req.headers.auth;
  if (token == "") {
    console.log(token);
    return res.json({
      isAuth: false,
      error: true,
      msg: "Server error"
    })
  }
  jwt.verify(token, secret, async (err, decode) => {
    let user = await User.findOne({ _id: decode._id })
    if (err) return res.json({
      isAuth: false,
      error: true,
      msg: "Server error"
    })
    if (!user)
      return res.json({
        isAuth: false,
        error: true
      });
    req.token = token;
    req.user = user;
    next();
  })
};


