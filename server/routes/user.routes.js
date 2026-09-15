import express from "express"
import { registerController } from "../controllers/user.controller.js"

const router = express.Router()

//routes
router.post("/register", registerController)

//exports
export default router