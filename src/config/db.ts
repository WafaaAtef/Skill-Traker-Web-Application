import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const url = process.env.MONGODB_URI as string;

    await mongoose.connect(url);

    console.log("Connected to MongoDB!");
  } catch (e) {
    console.error("MongoDB connection error:", e);
    process.exit(1);
  }
};