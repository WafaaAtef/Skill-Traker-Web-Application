import {Request,Response,NextFunction} from "express"
import jwt from "jsonwebtoken"
export const auth=(req:Request ,res:Response,next:NextFunction) =>{

       const token = req.cookies?.token
       if(!token){
        return res.status(401).json({msg:"unAuthoried"})
       }
       try{
        const verfied = jwt.verify(token,process.env.JWT_TOKEN as string) as {id : string , role : string };
         if(!verfied){
           return res.status(401).json({msg:"unAuthorize"})
         }
        req.user={
            id:verfied.id,
            role:verfied.role
        }
          next()
    }  
    catch(error){
 return res.status(500).json({msg:"server error"})
    }
}