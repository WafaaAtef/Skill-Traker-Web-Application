import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    skill:{
      type: String,
      enum:["Technical" ,"Reading", "English"]
    },
    track:{
      type:mongoose.Schema.Types.ObjectId,
      ref :"Track"
    },
    profileVisibility: {
      type: String,
      enum: ["public", "private"],
      default: "public",
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", userSchema);