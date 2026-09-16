"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetSkills = exports.completeTopic = exports.addUserSkill = exports.getUserSkills = exports.ChooseTrack = exports.GetRoadmaps = exports.GetTracks = void 0;
const TrackModel_1 = require("../models/TrackModel");
const userModel_1 = require("../models/userModel");
const userModel_2 = require("../models/userModel");
const roadMapModel_1 = require("../models/roadMapModel");
const userProgressModel_1 = require("../models/userProgressModel");
const GetTracks = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ msg: "user not found" });
        }
        const tracks = await TrackModel_1.Track.find();
        return res.status(200).json({ tracks });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "server error" });
    }
};
exports.GetTracks = GetTracks;
//////////////////////////////
const GetRoadmaps = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ msg: "user not found" });
        }
        const trackId = await TrackModel_1.Track.findById(req.params.id);
        if (!trackId)
            return res.status(400).json({ msg: "Invalid track" });
        const existRoadmaps = await roadMapModel_1.Roadmap.find({ track: trackId._id });
        return res.status(200).json({ existRoadmaps });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "server error" });
    }
};
exports.GetRoadmaps = GetRoadmaps;
//////////////////////////////
const ChooseTrack = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ msg: "unAuthorized" });
        }
        const verfiedUser = await userModel_1.User.findById(req.user.id);
        const track = await TrackModel_1.Track.findById(req.params.id);
        if (!verfiedUser || !track) {
            return res.status(400).json({ msg: "user or track not found" });
        }
        const hasSkill = verfiedUser.skill.some((skillId) => skillId.equals(track.skill));
        if (!hasSkill) {
            return res.status(400).json({ msg: "wrong skill" });
        }
        verfiedUser.track = track._id;
        await verfiedUser.save();
        return res.status(201).json({ msg: "track selected successfully" });
    }
    catch (error) {
        return res.status(500).json({ msg: "server error" });
    }
};
exports.ChooseTrack = ChooseTrack;
////////////////////////////
const getUserSkills = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ msg: "unAuthorized" });
        }
        const user = await userModel_1.User.findById(req.user.id)
            .populate("skill", "name")
            .select("skill");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const skills = user.skill.map((s) => ({
            id: s._id.toString(),
            name: s.name,
        }));
        return res.status(200).json({ skills });
    }
    catch (err) {
        console.error("getUserSkills error:", err);
        return res.status(500).json({ message: "Failed to fetch skills" });
    }
};
exports.getUserSkills = getUserSkills;
const addUserSkill = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ msg: "unAuthorized" });
        }
        const { skillId } = req.body;
        const skillExists = await userModel_2.Skill.findById(skillId);
        if (!skillExists) {
            return res.status(404).json({ message: "Skill not found in catalog" });
        }
        const user = await userModel_1.User.findByIdAndUpdate(req.user.id, { $addToSet: { skill: skillId } }, // prevents duplicates
        { new: true }).populate("skill", "name");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const skills = user.skill.map((s) => ({
            id: s._id.toString(),
            name: s.name,
        }));
        return res.status(200).json({ skills });
    }
    catch (err) {
        console.error("addUserSkill error:", err);
        return res.status(500).json({ message: "Failed to add skill" });
    }
};
exports.addUserSkill = addUserSkill;
const completeTopic = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ msg: "user not found" });
        }
        const roadmapId = req.body?.roadmapId;
        const topicId = req.body?.topicId;
        if (!roadmapId || !topicId) {
            return res.status(400).json({
                msg: "roadmapId and topicId are required",
            });
        }
        const roadmapExists = await roadMapModel_1.Roadmap.findById(roadmapId);
        if (!roadmapExists) {
            return res.status(404).json({ msg: "roadmap not found" });
        }
        const progress = await userProgressModel_1.UserProgress.findOneAndUpdate({ user: req.user.id, roadmap: roadmapId }, {
            $addToSet: {
                completedTopics: { topicId },
            },
        }, {
            new: true,
            upsert: true,
            setDefaultsOnInsert: true,
        });
        return res.status(200).json({
            msg: "topic completed successfully",
            completedTopics: progress?.completedTopics || [{ topicId }],
        });
    }
    catch (error) {
        console.error("completeTopic error:", error);
        return res.status(500).json({ msg: "server error" });
    }
};
exports.completeTopic = completeTopic;
///////////////////
const GetSkills = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ msg: "unAuthorized" });
        }
        const skills = await userModel_2.Skill.find().select("name category");
        const result = skills.map((s) => ({
            id: s._id.toString(),
            name: s.name,
            category: s.category,
        }));
        return res.status(200).json({ skills: result });
    }
    catch (error) {
        console.error("GetSkills error:", error);
        return res.status(500).json({ msg: "server error" });
    }
};
exports.GetSkills = GetSkills;
