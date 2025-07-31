import express from "express";
import {
  isAuthenticated,
  loginUser,
  logOutUser,
  register,
  resetPassword,
  sendResetOtp,
  sendVerifyOtp,
  verifyEmail,
  verifyResetOtp,
} from "../controllers/authController.js";
import userAuth from "../middleware/userAuth.js";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", loginUser);
authRouter.post("/logout", logOutUser);

authRouter.post("/send-verify-otp", userAuth, sendVerifyOtp);
authRouter.post("/verify-account", userAuth, verifyEmail);
authRouter.get("/is-auth", userAuth, isAuthenticated);
authRouter.post("/send-reset-otp", userAuth, sendResetOtp);
authRouter.post("/verify-otp", userAuth, verifyResetOtp);
authRouter.post("/reset-password", userAuth, resetPassword);

export default authRouter;
