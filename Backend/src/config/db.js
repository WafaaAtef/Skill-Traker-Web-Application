"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const connectDB = async () => {
    try {
        const url = process.env.MONGODB_URI;
        await mongoose_1.default.connect(url);
        console.log("Connected to MongoDB!");
    }
    catch (e) {
        console.error("MongoDB connection error:", e);
        process.exit(1);
    }
};
exports.connectDB = connectDB;
