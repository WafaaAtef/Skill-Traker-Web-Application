import {Router} from "express"
import {SignIn , SignUp} from "../controllers/authController"
import express from "express"

const authRouter = Router()

authRouter.post("/SignIn" ,SignIn)
authRouter.post("/SignUp" ,SignUp)

export default authRouter