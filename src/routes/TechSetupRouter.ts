import {Router} from "express"
import {addTrack,AddRoadMap,addSkills} from "../controllers/TechSetupController"
import {AddTrackOrRoadmap} from "../middleware/techSetupMiddleware"
import {auth} from "../middleware/authMidddleware"
import express from "express"
const TechRouter =Router()


TechRouter.post("/addTrack"  ,AddTrackOrRoadmap, addTrack)
TechRouter.post("/addRoadmap" , AddRoadMap)
TechRouter.post("/addSkills" , auth , AddTrackOrRoadmap, addSkills)

export default TechRouter