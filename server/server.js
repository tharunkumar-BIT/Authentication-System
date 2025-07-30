import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";

import connectdb from "./db/db.js";
import authRouter from "./routes/authRoutes.js";
import userRoute from "./routes/userRoutes.js";

const app = express();
const port = process.env.PORT || 4000;
connectdb();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true }));

app.get("/", (req, res) => res.send("API Working"));
app.use("/api/auth", authRouter);
app.use("/api/user", userRoute);

app.listen(port, () => console.log(`Server running on port: ${port}`));
