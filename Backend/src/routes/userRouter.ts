import {Router} from "express";
import{chooseSkill} from "../controllers/skillController";
import{ChooseTrack,GetTracks ,GetRoadmaps, getUserSkills, addUserSkill} from "../controllers/techUserController";
import {auth} from "../middleware/authMidddleware";
import {addSkillSchema} from '../validators/skill.validator';
import { validate } from "../middleware/validate";

const userRouters =Router()

userRouters.get("/chooseSkill/:id" , auth ,chooseSkill)
userRouters.get("/ChooseTrack/:id" , auth ,ChooseTrack)
userRouters.get("/GetTracks" , auth ,GetTracks)
userRouters.get("/GetRoadmaps/:id" ,auth,GetRoadmaps)
userRouters.get("/user/skills", auth, getUserSkills);
userRouters.post("/user/skills", auth, validate(addSkillSchema), addUserSkill);

export default userRouters