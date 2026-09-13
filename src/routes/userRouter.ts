import {Router} from "express"
import{chooseSkill} from "../controllers/skillController"
import{ChooseTrack,GetTracks ,GetRoadmaps} from "../controllers/techUserController"
import {auth} from "../middleware/authMidddleware"

const userRouters =Router()

userRouters.get("/chooseSkill/:id" , auth ,chooseSkill)
userRouters.get("/ChooseTrack/:id" , auth ,ChooseTrack)
userRouters.get("/GetTracks" , auth ,GetTracks)
userRouters.get("/GetRoadmaps/:id" ,auth,GetRoadmaps)

export default userRouters