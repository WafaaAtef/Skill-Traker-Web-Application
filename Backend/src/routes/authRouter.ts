import {Router} from "express"
import {SignIn , SignUp,SignOut} from "../controllers/authController"
import {auth} from "../middleware/authMiddleware"

const authRouter = Router()

authRouter.post("/SignIn" ,SignIn)
authRouter.post("/SignUp" ,SignUp)
authRouter.get("/SignOut" ,auth,SignOut)

export default authRouter