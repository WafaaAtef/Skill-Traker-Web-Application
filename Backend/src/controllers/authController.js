"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignOut = exports.SignIn = exports.SignUp = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = require("../models/userModel");
const maxAge = 60 * 60;
const JWT_SECRET = process.env.JWT_TOKEN || "secret123";
const createToken = (id, role) => {
    return jsonwebtoken_1.default.sign({ id, role }, JWT_SECRET, { expiresIn: maxAge });
};
const SignUp = async (req, res) => {
    try {
        const { firstName, lastName, email, country, password } = req.body;
        if (!firstName || !lastName || !email || !password || !country)
            return res.status(400).json({ msg: "all fields are requred" });
        const isExist = await userModel_1.User.findOne({ email });
        if (isExist) {
            return res.status(400).json({ msg: "user already exists" });
        }
        const hashedPass = await bcryptjs_1.default.hash(password, 10);
        const newUser = await userModel_1.User.create({
            firstName,
            lastName,
            email,
            password: hashedPass,
            country
        });
        res.status(200).json({
            msg: "user created"
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "internal server error" });
    }
};
exports.SignUp = SignUp;
/////////////////////////////////////////////////////////
const SignIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password)
            return res.status(400)
                .json({ msg: "all fields are requred !" });
        const user = await userModel_1.User.findOne({ email });
        if (!user) {
            return res.status(400)
                .json({ msg: "invalid email or password" });
        }
        const isMatch = await bcryptjs_1.default.compare(password, user.password);
        if (!isMatch)
            return res.status(400)
                .json({ msg: "invalid email or password" });
        const token = createToken(user.id, user.role);
        res.cookie("token", token, { maxAge: maxAge * 1000, httpOnly: true, sameSite: "none", secure: true });
        res.status(200)
            .json({ msg: "Logged in" });
    }
    catch (error) {
        return res.status(500)
            .json({ msg: "internal server error" });
    }
};
exports.SignIn = SignIn;
///////////////////////////////
const SignOut = (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ msg: "user not found" });
        }
        res.clearCookie("token", {
            httpOnly: true,
            sameSite: "none",
            secure: true
        });
        res.status(200).json({ msg: "Logged Out successfully" });
    }
    catch (error) {
        return res.status(500)
            .json({ msg: "internal server error" });
    }
};
exports.SignOut = SignOut;
