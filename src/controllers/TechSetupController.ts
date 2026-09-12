import {Request,Response } from "express"
import {Track} from "../models/TrackModel"
import {User,Skill} from "../models/userModel"
import { UserProgress } from "../models/userProgressModel"
import {Roadmap} from "../models/roadMapModel"

export const addTrack =async (req:Request,res:Response) =>{
  try{
    const tracks =req.body
    const NewTracks = await Track.insertMany(tracks)

res.status(200).json({msg:"Tracks added successfully"})

}
catch(error){
        console.log(error);

    return res.status(500).json({
        msg:"server error"
    })
}
}

///////////////////////

export const AddRoadMap =async (req:Request,res:Response) =>{
    try{
const {title,description,track,levels} =req.body

await Roadmap.create({
    title,
    description,
    track,
    levels
})

res.status(200).json({msg:"Roadmaps added successfully"})

 }
 catch(error){
    return res.status(500).json({
        msg:"server error"
    })
}
}

/////////////////////////

export const addSkills = async (req:Request,res:Response) =>{
try{
const skills =req.body
const newSkills = await Skill.insertMany(skills)

res.status(200).json({msg:"Skills added successfully"})
}
catch(error)
{
        return res.status(500).json({
        msg:"server error"
})
}
}
