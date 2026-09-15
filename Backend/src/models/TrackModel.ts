import mongoose from "mongoose";

const trackSchema = new mongoose.Schema(
  {
    skill:{
      type: mongoose.Schema.Types.ObjectId,
      ref : "Skill",
      required: true
    },    
    
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Track = mongoose.model("Track", trackSchema);
