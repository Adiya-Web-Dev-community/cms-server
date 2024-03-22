const jwt = require("jsonwebtoken");
require("dotenv").config();

const accountMiddleware = (token) => {
  try {
    if (token) {
      const {_id} = jwt.verify(token, process.env.JWT_SECRET_KEY);
      if (_id) {
        return _id;
      }
      return _id
    } else {
      console.log("token Not Valid");
    }
  } catch (err) {
    console.error(err);  
  }
};
module.exports = accountMiddleware;
