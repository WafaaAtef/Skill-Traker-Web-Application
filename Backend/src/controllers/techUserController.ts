import {Request,Response } from "express";
import {Track} from "../models/TrackModel";
import {User} from "../models/userModel";
import {Skill} from "../models/userModel"; 
import {Roadmap} from "../models/roadMapModel";
import { UserProgress } from "../models/userProgressModel";

export const GetTracks =async (req:Request,res:Response) =>{
try{
    if(!req.user){
            return res.status(401).json({msg:"user not found"})
    }
    const tracks = await Track.find()
    return res.status(200).json({tracks})
    }
catch(error)
{
     console.error(error)
     return res.status(500).json({msg:"server error"})}
}
//////////////////////////////

export const GetRoadmaps =async (req:Request,res:Response) =>{
try{
    if(!req.user){
            return res.status(401).json({msg:"user not found"})
    }
    const trackId = await Track.findById(req.params.id)
    if(!trackId)
  return res.status(400).json({msg:"Invalid track"})

    const existRoadmaps = await Roadmap.find({track :trackId._id})
    return res.status(200).json({existRoadmaps})
    }
catch(error)
{
        console.error(error)
     return res.status(500).json({msg:"server error"})}
}

////////////////////////////
export const ChooseTrack = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ msg: "unAuthorized" });
    }

    const verifiedUser = await User.findById(req.user.id);
    const track = await Track.findById(req.params.id);

    if (!verifiedUser || !track) {
      return res.status(400).json({ msg: "user or track not found" });
    }

    const userSkills = verifiedUser.skill || [];
    const hasSkill = userSkills.some((skillId) =>
      skillId && typeof skillId.equals === "function" && skillId.equals(track.skill)
    );

    if (!hasSkill) {
      return res.status(400).json({ msg: "wrong skill" });
    }

    verifiedUser.track = track._id;
    await verifiedUser.save();

    return res.status(201).json({ msg: "track selected successfully" });
  } catch (error) {
    return res.status(500).json({ msg: "server error" });
  }
};

////////////////////////////
export const getUserSkills = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ msg: "unAuthorized" });
    }

    const user = await User.findById(req.user.id)
      .populate("skill", "name")
      .select("skill");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const skills = (user.skill || []).map((s: any) => ({
      id: s._id.toString(),
      name: s.name,
    }));

    return res.status(200).json({ skills });
  } catch (err) {
    console.error("getUserSkills error:", err);
    return res.status(500).json({ message: "Failed to fetch skills" });
  }
};

export const addUserSkill = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ msg: "unAuthorized" });
    }

    const { skillId } = req.body; 

    const skillExists = await Skill.findById(skillId);
    if (!skillExists) {
      return res.status(404).json({ message: "Skill not found in catalog" });
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $addToSet: { skill: skillId } },
      { new: true }
    ).populate("skill", "name");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const skills = (user.skill || []).map((s: any) => ({
      id: s._id.toString(),
      name: s.name,
    }));

    return res.status(200).json({ skills });
  } catch (err) {
    console.error("addUserSkill error:", err);
    return res.status(500).json({ message: "Failed to add skill" });
  }
};

export const completeTopic = async (req: Request, res: Response) => {
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

    const roadmapExists = await Roadmap.findById(roadmapId);
    if (!roadmapExists) {
      return res.status(404).json({ msg: "roadmap not found" });
    }

    const progress = await UserProgress.findOneAndUpdate(
      { user: req.user.id, roadmap: roadmapId },
      {
        $addToSet: {
          completedTopics: { topicId },
        },
      },
      {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true,
      }
    );

    return res.status(200).json({
      msg: "topic completed successfully",
      completedTopics: progress?.completedTopics || [{ topicId }],
    });
  } catch (error) {
    console.error("completeTopic error:", error);
    return res.status(500).json({ msg: "server error" });
  }
};