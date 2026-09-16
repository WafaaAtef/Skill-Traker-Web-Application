"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserProgress = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const completedTopicSchema = new mongoose_1.default.Schema({
    topicId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
    }
}, {
    _id: false,
});
const userProgressSchema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    roadmap: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Roadmap",
        required: true,
    },
    completedTopics: {
        type: [completedTopicSchema],
        default: [],
    }
}, {
    timestamps: true,
});
userProgressSchema.index({
    user: 1,
    roadmap: 1,
}, {
    unique: true,
});
exports.UserProgress = mongoose_1.default.model("UserProgress", userProgressSchema);
