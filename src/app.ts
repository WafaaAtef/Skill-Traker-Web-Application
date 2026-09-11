import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import TechRouter from "./routes/TechSetupRouter"
import authRouter  from "./routes/authRouter";
import userRouter from "./routes/userRouter";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
app.use(cookieParser())
app.use(express.json());
app.use("/adminApi",TechRouter)
app.use("/authApi",authRouter)
app.use("/userApi",userRouter)

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();