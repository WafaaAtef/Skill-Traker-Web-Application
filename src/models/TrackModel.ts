import mongoose from "mongoose";

const trackSchema = new mongoose.Schema(
  {
skill:{
      type: mongoose.Schema.Types.ObjectId,
      ref : "Skill",
      default:"6aa427a375a7cd3bfe1f4c27"
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
