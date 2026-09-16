"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Track = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const trackSchema = new mongoose_1.default.Schema({
    skill: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Skill",
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
}, {
    timestamps: true,
});
exports.Track = mongoose_1.default.model("Track", trackSchema);
