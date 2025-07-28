import TryCatch from "../utils/TryCatch.js";
import { User } from "../models/userModel.js";
import { generateToken } from "../utils/GenerateToken.js";
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
