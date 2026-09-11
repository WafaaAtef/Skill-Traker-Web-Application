import {Router} from "express"
import {addTrack,AddRoadMap} from "../controllers/TechSetupController"
import {AddTrackOrRoadmap} from "../middleware/techSetupMiddleware"
import {auth} from "../middleware/authMidddleware"
import express from "express"
const TechRouter =Router()


TechRouter.post("/addTrack" , auth ,AddTrackOrRoadmap, addTrack)
TechRouter.post("/addRoadmap" , auth , AddTrackOrRoadmap, AddRoadMap)

export default TechRouter