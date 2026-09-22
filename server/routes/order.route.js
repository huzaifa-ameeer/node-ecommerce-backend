import express from "express"
import isAuth from "../middleware/auth.middleware.js"
import { createOrderController } from "../controllers/order.controller.js"

const router = express.Router()

//routes

//create order (POST)
router.post("/create", isAuth, createOrderController)

//export 
export default router