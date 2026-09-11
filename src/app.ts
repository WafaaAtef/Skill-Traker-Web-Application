import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import TechRouter from "./routes/TechSetupRouter"
import authRouter  from "./routes/authRouter";
dotenv.config();

const app = express();

app.use(express.json());
app.use("/admin",TechRouter)
app.use("/",authRouter)

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();