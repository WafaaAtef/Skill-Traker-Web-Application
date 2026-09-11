import {Router} from "express"
import {SignIn , SignUp} from "../controllers/authController"
import express from "express"

const authRouter = Router()

authRouter.post("/Sign In" ,SignIn)
authRouter.post("/Sign Up" ,SignUp)

export default authRouter