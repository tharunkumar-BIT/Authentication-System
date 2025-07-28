import TryCatch from "../utils/TryCatch.js";
import { User } from "../models/userModel.js";
import { generateToken } from "../utils/GenerateToken.js";
import bcrypt from "bcryptjs";

export const register = TryCatch(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      message: "Missing inputs",
    });
  }

  let user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({
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
});
