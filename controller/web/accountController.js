require("dotenv").config();
// Modules
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// Models
const User = require("../../models/web/user");
// Helper Function
const sendOtpRequest = require("../../helper/otp");

//new account registration
const register = async (req, res) => {
  const { email } = req.body;
  try {
    let user = await User.findOne({ email: email });
    if (user) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }

    const min = 100000;
    const max = 999999;
    const generatedOTP = Math.floor(Math.random() * (max - min + 1)) + min;

    await sendOtpRequest.sendOtp(req.body.email, generatedOTP);

    const newUser = new User({
      name: req.body.fullName,
      email: email,
      otp: generatedOTP,
    });

    await newUser.save();

    res.status(200).json({
      success: true,
      message: "User created successfully",
      newUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// OTP verification
const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;
  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.otp !== otp) {
      return res.status(401).json({
        success: false,
        message: "Invalid OTP",
      });
    }
    user.verified = true;
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRE_TIME,
    });
    await user.save();
    res.status(200).json({
      success: true,
      token: token,
      message: "OTP verification successful",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Exsiting account login
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRE_TIME,
    });

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user,
      token: token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Add password after verification
const addPassword = async (req, res) => {
  try {
    const user = await User.findById(req.accountId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const password = req.body.password;
    const hashPassword = await bcrypt.hash(password, 10);

    user.password = hashPassword;
    await user.save();
    return res.status(200).json({
      success: true,
      message: "User password saved successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { register, login, verifyOTP, addPassword };
