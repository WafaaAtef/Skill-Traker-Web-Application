"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddTrackOrRoadmap = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const AddTrackOrRoadmap = async (req, res, next) => {
    try {
        const token = req.cookies?.token;
        if (!token)
            return res.status(401).json({ msg: "unAutorized" });
        const verfiedUser = await jsonwebtoken_1.default.verify(token, process.env.JWT_TOKEN);
        if (!verfiedUser)
            return res.status(401).json({ msg: "unAutorized" });
        if (verfiedUser.role != "admin")
            return res.status(403).json({ msg: "Forbidden" });
        next();
    }
    catch (error) {
        return res.status(500).json({ msg: "server error" });
    }
};
exports.AddTrackOrRoadmap = AddTrackOrRoadmap;
