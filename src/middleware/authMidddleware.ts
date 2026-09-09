import {Request,Response,NextFunction} from "express"
import jwt from "jsonwebtoken"
export const auth=(req:Request ,res:Response,next:NextFunction) =>{

    
       const token = req.cookies?.token
       if(!token){
        return res.status(401).json({msg:"unAuthorized"})
       }
       try{
        const verfied = jwt.verify(token,process.env.JWT_TOKEN)
         if(!verfied){
           return res.status(401).json({msg:"unAuthorized"})
         }
        req.user={
            id:verfied.id
        }
          next()
    }  
    catch(error){
 return res.status(500).json({msg:"server error"})

    }
}