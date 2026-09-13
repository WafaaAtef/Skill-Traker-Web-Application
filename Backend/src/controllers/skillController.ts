import {Request,Response} from "express"
import {User,Skill} from "../models/userModel"


export const chooseSkill= async (req:Request,res:Response)=>{
    try{
        if(!req.user){
        return res.status(400).json({msg:"user not found"})
    }
   const SelectedSkill = await Skill.findById(req.params.id)
   if(!SelectedSkill)
    return res.status(400).json({msg:"invalid skill"})

    const userWithSkill =await User.findById(req.user.id) 
    
     if(!userWithSkill){
        return res.status(400).json({msg:"user not found"})
    }
    if(userWithSkill.skill !== undefined){
        return res.status(400).json({msg:"Already have a skill"})
    }
    
     userWithSkill.skill= SelectedSkill._id
     await userWithSkill.save()
     res.status(200).json({msg:"Skill Created"})
    }
     catch(error){
     res.status(500).json({msg:"Server Error"})
     }
    }
    
