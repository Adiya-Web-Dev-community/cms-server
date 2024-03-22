const jwt = require("jsonwebtoken");
require("dotenv").config();

const TokentExpiry = (req, resp, next) => {

  const token = req.headers.authorization;
  try {
    if (token) {
      const { _id } = jwt.verify(token, process.env.JWT_SECRET_KEY);
      if (_id) {
        resp
        .status(200)
        .json({ success: true });
      }
    } else {
      resp
        .status(401)
        .json({ success: false, message: "token expired, access denied" });
    }
  } catch (err) {
    resp.json({ success: false, message: err });
  }
};

module.exports = TokentExpiry;
