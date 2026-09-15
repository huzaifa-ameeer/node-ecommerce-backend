import express from "express"
import { loginController, registerController } from "../controllers/user.controller.js"

const router = express.Router()

//routes

//register user
router.post("/register", registerController)
//login user
router.post("/login", loginController)

//exports
export default router