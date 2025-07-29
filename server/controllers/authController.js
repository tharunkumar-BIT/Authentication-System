import TryCatch from "../utils/TryCatch.js";
import { User } from "../models/userModel.js";
import { generateToken } from "../utils/GenerateToken.js";
import { deleteToken } from "../utils/DeleteToken.js";
import { sendWelcomeEmail, sendVerficationOtp } from "../utils/SendEmail.js";
import bcrypt from "bcryptjs";

export const register = TryCatch(async (req, res) => {
  const { name, email, password } = req.body;

  let user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({
      success: false,
      message: "User already exist",
    });
  }

  const hashPassword = await bcrypt.hash(password, 10);

  user = await User.create({
    name,
    email,
    password: hashPassword,
  });

  generateToken(user, res);

  sendWelcomeEmail(email);

  res.status(200).json({
    success: true,
    message: "User Registered",
  });
});

export const loginUser = TryCatch(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({
      success: false,
      message: "No user found",
    });
  }

  const comparePassword = await bcrypt.compare(password, user.password);
  if (!comparePassword) {
    return res.status(400).json({
      success: false,
      message: "password doesn't match",
    });
  }

  generateToken(user, res);

  res.status(200).json({
    success: true,
    message: "Logged in",
  });
});

export const logOutUser = TryCatch(async (req, res) => {
  deleteToken(res);
  res.status(200).json({
    success: true,
    message: "Logged out",
  });
});

export const sendVerifyOtp = TryCatch(async (req, res) => {
  const userId = req.userId;
  const user = await User.findById(userId);

  if (user.isAccountVerified) {
    return res.status(200).json({
      message: "Account already verfied",
    });
  }

  const otp = String(Math.floor(100000 + Math.random() * 900000));

  user.verifyotp = otp;
  user.verifyotpExpireAt = Date.now() + 24 * 60 * 60 * 1000;

  await user.save();

  sendVerficationOtp(user.email, otp);

  res.status(200).json({
    success: true,
    message: "Verification OTP sent on Email",
  });
});

export const verifyEmail = TryCatch(async (req, res) => {
  const { otp } = req.body;
  const userId = req.userId;

  if (!userId || !otp) {
    return res.status(400).json({
      success: false,
      message: "Missing details",
    });
  }

  const user = await User.findById(userId);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  if (user.verifyotp === "" || user.verifyotp !== otp) {
    return res.status(400).json({
      success: false,
      message: "Incorrect OTP",
    });
  }

  if (user.verifyotpExpireAt < Date.now()) {
    return res.status(403).json({
      success: false,
      message: "OTP expired",
    });
  }

  user.isAccountVerified = true;
  user.verifyotp = "";
  user.verifyotpExpireAt = 0;
  await user.save();

  res.status(200).json({
    success: true,
    message: "Account verfied",
  });
});

export const isAuthenticated = TryCatch(async (req, res) => {
  return res.status(200).json({
    success: true,
    message: "User is Authenticated",
  });
});
