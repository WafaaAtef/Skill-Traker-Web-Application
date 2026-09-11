import {Router} from "express"
import{chooseSkill} from "../controllers/skillController"
import{ChooseTrack} from "../controllers/techUserController"

import {auth} from "../middleware/authMidddleware"

import express from "express"
const userRouter =Router()


userRouter.get("/chooseSkill/:id" , auth ,chooseSkill)
userRouter.get("/ChooseTrack/:id" , auth ,ChooseTrack)

export default userRouter