import {Request ,Response} from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import {User} from "../models/userModel"

const maxAge = 60 *60 ;
const createToken =(id:string , role :string) :String =>{
    return jwt.sign({id , role} , process.env.JWT_TOKEN as string, {expiresIn:maxAge})
}
const SignUp = async(req:Request ,res:Response) =>{
     try {
    const{userName , email ,password , country} =req.body ;
    if(!userName || !email  || !password )
        return res.status(400).json({msg :"all fields are requred !"})
    const isExist = await User.findOne({email})
    if(isExist){
        return res.status(400).json({msg:"user already exists"})
    }
    const hashedPass = await bcrypt.hash(password,10)
    User.create({
        userName , 
        email,
        password :hashedPass
    })
    res.status(200).json({
        msg:"user created"
    })
     }
    catch(error){
 return res.status(500).json({msg :"internal server error"})
    }

 }
/////////////////////////////////////////////////////////
 const SignIn = async(req:Request ,res:Response) =>{
   try {
      const{email ,password} =req.body ;
      if(!email || !password )
        return res.status(400)
          .json({msg :"all fields are requred !"})
      const user= await User.findOne({email})
      if(!user){
        return res.status(400)
          .json({msg :"invalid email or password"})}
   
      const isMatch =await bcrypt.compare(password,user.password)
      if(!isMatch)
        return res.status(400)
          .json({msg :"invalid email or password"})
     
      const token =createToken(user.id ,user.role)

      res.cookie("token",token,
        {maxAge:maxAge* 1000 ,httpOnly:true})

      res.status(200)
          .json({msg:"Logged in" })
    }
  catch(error){
       return res.status(500)
          .json({msg :"internal server error"})}}
    
    