import express from "express";
import {
  loginUser,
  logOutUser,
  register,
} from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", loginUser);
authRouter.post("/logout", logOutUser);

export default authRouter;
