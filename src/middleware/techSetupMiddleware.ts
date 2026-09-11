import {Request,Response,NextFunction} from "express"
import jwt from "jsonwebtoken"
export const AddTrackOrRoadmap =async (req: Request ,res:Response ,next:NextFunction)=> {
try{
  const token = req.cookies?.token
  if(!token)
        return res.status(401).json({msg:"unAutorized"})

 const verfiedUser =await jwt.verify(token, process.env.JWT_TOKEN as string) as { role: string }
         if(!verfiedUser)
            return res.status(401).json({msg:"unAutorized"})
       if(verfiedUser.role !="admin")
            return res.status(401).json({msg:"unAutorized"})
next()
    }
catch(error){
            return res.status(500).json({msg:"server error"})

}
}