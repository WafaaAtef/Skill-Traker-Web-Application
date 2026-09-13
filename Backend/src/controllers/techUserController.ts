import {Request,Response } from "express";
import {Track} from "../models/TrackModel";
import {User} from "../models/userModel";
import {Skill} from "../models/userModel"; 
import {Roadmap} from "../models/roadMapModel";

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

//////////////////////////////
export const ChooseTrack = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ msg: "unAuthorized" });
    }

    const verfiedUser = await User.findById(req.user.id);
    const track = await Track.findById(req.params.id);

    if (!verfiedUser || !track) {
      return res.status(400).json({ msg: "user or track not found" });
    }

    const hasSkill = verfiedUser.skill.some((skillId) =>
      skillId.equals(track.skill)
    );

    if (!hasSkill) {
      return res.status(400).json({ msg: "wrong skill" });
    }

    verfiedUser.track = track._id;
    await verfiedUser.save();

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

    const skills = user.skill.map((s: any) => ({
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
      { $addToSet: { skill: skillId } }, // prevents duplicates
      { new: true }
    ).populate("skill", "name");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const skills = user.skill.map((s: any) => ({
      id: s._id.toString(),
      name: s.name,
    }));

    return res.status(200).json({ skills });
  } catch (err) {
    console.error("addUserSkill error:", err);
    return res.status(500).json({ message: "Failed to add skill" });
  }
};