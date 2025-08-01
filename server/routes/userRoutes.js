import express from "express";
import userAuth from "../middleware/userAuth.js";
import { getUserData } from "../controllers/userController.js";

const userRoute = express.Router();

userRoute.get("/data", userAuth, getUserData);

export default userRoute;
