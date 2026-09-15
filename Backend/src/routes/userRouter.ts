import {Router} from "express";
import{chooseSkill} from "../controllers/skillController";
import{ChooseTrack,GetTracks ,GetRoadmaps, getUserSkills, addUserSkill, completeTopic} from "../controllers/techUserController";
import {auth} from "../middleware/authMiddleware";
import {addSkillSchema} from '../validators/skill.validator';
import { validate } from "../middleware/validate";

const userRouters =Router();

userRouters.post("/chooseSkill/:id" , auth ,chooseSkill)
userRouters.post("/ChooseTrack/:id" , auth ,ChooseTrack)
userRouters.get("/GetTracks" , auth ,GetTracks)
userRouters.get("/GetRoadmaps/:id" ,auth,GetRoadmaps)
userRouters.get("/user/skills", auth, getUserSkills);
userRouters.post("/user/skills", auth, validate(addSkillSchema), addUserSkill);
userRouters.post("/user/progress/:roadmapId/topics/:topicId/complete", auth, completeTopic);
userRouters.post("/user/progress/complete", auth, completeTopic);

export default userRouters