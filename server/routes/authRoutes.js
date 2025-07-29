import express from "express";
import {
  loginUser,
  logOutUser,
  register,
  sendVerifyOtp,
  verifyEmail,
} from "../controllers/authController.js";
import userAuth from "../middleware/userAuth.js";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", loginUser);
authRouter.post("/logout", logOutUser);

authRouter.post("/send-verify-otp", userAuth, sendVerifyOtp);
authRouter.post("/verify-account", userAuth, verifyEmail);

export default authRouter;
