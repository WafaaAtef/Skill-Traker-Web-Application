import mongoose from "mongoose";

const resourceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    type: {
      type: String,
      required: true,
      enum: [
        "video",
        "article",
        "course",
        "book",
        "documentation",
        "other",
      ],
    },

    url: {
      type: String,
      required: true,
      trim: true,
    },

    duration: {
      type: Number,
      min: 0,
    },
  },
  {
    _id: true,
  }
);

const topicSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    estimatedTime: {
      type: Number,
      min: 0,
    },

    order: {
      type: Number,
      required: true,
      min: 1,
    },

    resources: {
      type: [resourceSchema],
      default: [],
    },
  },
  {
    _id: true,
  }
);


const levelSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    order: {
      type: Number,
      required: true,
      min: 1,
    },

    topics: {
      type: [topicSchema],
      default: [],
    },
  },
  {
    _id: true,
  }
);


const roadmapSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    track: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Track",
      required: true,
    },

    levels: {
      type: [levelSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);


export const Roadmap = mongoose.model("Roadmap", roadmapSchema);