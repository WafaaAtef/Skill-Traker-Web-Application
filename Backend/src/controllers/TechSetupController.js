"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addSkills = exports.AddRoadMap = exports.addTrack = void 0;
const TrackModel_1 = require("../models/TrackModel");
const userModel_1 = require("../models/userModel");
const roadMapModel_1 = require("../models/roadMapModel");
const addTrack = async (req, res) => {
    try {
        const tracks = req.body;
        const NewTracks = await TrackModel_1.Track.insertMany(tracks);
        res.status(200).json({ msg: "Tracks added successfully" });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "server error"
        });
    }
};
exports.addTrack = addTrack;
///////////////////////
const AddRoadMap = async (req, res) => {
    try {
        const { title, description, track, levels } = req.body;
        await roadMapModel_1.Roadmap.create({
            title,
            description,
            track,
            levels
        });
        res.status(200).json({ msg: "Roadmaps added successfully" });
    }
    catch (error) {
        return res.status(500).json({
            msg: "server error"
        });
    }
};
exports.AddRoadMap = AddRoadMap;
/////////////////////////
const addSkills = async (req, res) => {
    try {
        const skills = req.body;
        const newSkills = await userModel_1.Skill.insertMany(skills);
        res.status(200).json({ msg: "Skills added successfully" });
    }
    catch (error) {
        console.error("addSkills error:", error);
        return res.status(500).json({
            msg: "server error!"
        });
    }
};
exports.addSkills = addSkills;
