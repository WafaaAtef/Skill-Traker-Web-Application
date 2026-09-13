import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import TechRouter from "./routes/TechSetupRouter"
import authRouter  from "./routes/authRouter";
import userRouter from "./routes/userRouter";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
// Simple CORS middleware (allows frontend at FRONTEND_URL or http://localhost:3000)
app.use((req, res, next) => {
  const origin = process.env.FRONTEND_URL || "http://localhost:3000";
  res.header("Access-Control-Allow-Origin", origin);
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  if (req.method === "OPTIONS") return res.sendStatus(200);
  next();
});
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