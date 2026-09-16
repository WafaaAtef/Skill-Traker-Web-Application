"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Skill = exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
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
    country: {
        type: String
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
    skill: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Skill"
        }],
    track: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Track"
    },
    profileVisibility: {
        type: String,
        enum: ["public", "private"],
        default: "public",
    },
}, {
    timestamps: true,
});
exports.User = mongoose_1.default.model("User", userSchema);
const SkillSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    category: {
        type: String,
        trim: true,
    }
});
exports.Skill = mongoose_1.default.model("Skill", SkillSchema);
