import mongoose from "mongoose";

const completedTopicSchema = new mongoose.Schema(
  {
    topicId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    completedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    _id: false,
  }
);


const userProgressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    roadmap: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Roadmap",
      required: true,
    },

    completedTopics: {
      type: [completedTopicSchema],
      default: [],
    },

    startedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

userProgressSchema.index(
  {
    user: 1,
    roadmap: 1,
  },
  {
    unique: true,
  }
);


export const UserProgress = mongoose.model(
  "UserProgress",
  userProgressSchema
);