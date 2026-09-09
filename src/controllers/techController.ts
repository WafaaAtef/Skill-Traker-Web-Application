import {Request,Response } from "express"
import {Track} from "../models/TrackModel"
import {User} from "../models/userModel"
import { UserProgress } from "../models/userProgressModel"
const ChooseTrack =async (req:Request,res:Response) =>{
 try{
    if(!req.user){
            return res.status(401).json({msg:"unAuthorized"})

    }
    const verfiedUser = await User.findById(req.user.id)
    const track =await Track.findById(req.params.id)

  if(!verfiedUser ||! track)
        return res.status(400).json({msg:"user or track not found"})

  if(verfiedUser.skill != track.skill)
    return res.status(400).json({msg:"wrong skill"})

  verfiedUser.track=track._id
  await verfiedUser.save()
    return res.status(201).json({msg:"track selected successfully"})
}

catch(error){
   return res.status(500).json({msg:"server error"})}
}

