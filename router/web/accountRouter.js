const express = require("express");
const router = express.Router();
const middleware = require("../../middleware/account.js");
const TokentExpiry = require("../../middleware/checkTokenExpiry.js");
//controllers
const {
  register,
  login,
  verifyOTP,
  addPassword,
} = require("../../controller/web/accountController.js");

//routes
router.post("/account/register", register);
router.post("/account/login", login);
router.put("/account/verifyOTP", verifyOTP);
router.put("/account/password", middleware, addPassword);
router.get("/check-token", TokentExpiry);

module.exports = router;
