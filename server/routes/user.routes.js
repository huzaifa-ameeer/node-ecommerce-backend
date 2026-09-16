import express from "express"
import { loginController, registerController, userProfileController } from "../controllers/user.controller.js"
import isAuth from "../middleware/auth.middleware.js"

const router = express.Router()

//routes

//register user
router.post("/register", registerController)
//login user
router.post("/login", loginController)
//user profile
router.get("/profile", isAuth, userProfileController)

//exports
export default router