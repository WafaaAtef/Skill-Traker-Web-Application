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
     country :{
    type: String
},
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    skill:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Skill"
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

const SkillSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    }
  })

export const Skill = mongoose.model("Skill",SkillSchema)