import express from "express"
import { createProductController, getAllProductsController, getSingleProductController, updateProductController } from "../controllers/product.controller.js"
import isAuth from "../middleware/auth.middleware.js"
import singleUpload from "../middleware/multer.js"

const router = express.Router()

//routes

//get all products (GET)
router.get("/get-all", getAllProductsController)
//get single product (GET)
router.get("/:id", getSingleProductController)
// //create product (POST)
router.post("/create", isAuth, singleUpload, createProductController)
//update product (PUT)
router.put("/update/:id", updateProductController)

//exports
export default router