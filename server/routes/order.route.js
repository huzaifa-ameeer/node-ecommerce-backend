import express from "express"
import  isAuth, { isAdmin } from "../middleware/auth.middleware.js"
import { createOrderController, getAdminAllOrdersController, getOrdersController, getSingleOrderController } from "../controllers/order.controller.js"

const router = express.Router()

//routes

//create order (POST)
router.post("/create", isAuth, createOrderController)
//get all orders (GET)
router.get("/get-all", isAuth,
    getOrdersController
)
// get single order (GET)
router.get("/get/:id", isAuth, getSingleOrderController)
//get all orders as admin(GET)
router.get("/admin/get-all", isAuth, isAdmin, getAdminAllOrdersController)

//export 
export default router