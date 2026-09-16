"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Roadmap = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const resourceSchema = new mongoose_1.default.Schema({
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
}, {
    _id: true,
});
const topicSchema = new mongoose_1.default.Schema({
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
    resources: {
        type: [resourceSchema],
        default: [],
    },
}, {
    _id: true,
});
const levelSchema = new mongoose_1.default.Schema({
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
}, {
    _id: true,
});
const roadmapSchema = new mongoose_1.default.Schema({
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
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Track",
        required: true,
    },
    levels: {
        type: [levelSchema],
        default: [],
    },
}, {
    timestamps: true,
});
exports.Roadmap = mongoose_1.default.model("Roadmap", roadmapSchema);
