"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth = (req, res, next) => {
    const token = req.cookies?.token;
    if (!token) {
        return res.status(401).json({ msg: "unAuthorzied" });
    }
    try {
        const verfied = jsonwebtoken_1.default.verify(token, process.env.JWT_TOKEN);
        if (!verfied) {
            return res.status(401).json({ msg: "unAuthorized" });
        }
        req.user = {
            id: verfied.id,
            role: verfied.role
        };
        next();
    }
    catch (error) {
        console.error("auth middleware error:", error);
        return res.status(500).json({ msg: "server error" });
    }
};
exports.auth = auth;
