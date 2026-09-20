import express from "express"
import isAuth from "../middleware/auth.middleware.js"
import { createCategoryController, deleteCategoryController, getAllCategoriesController } from "../controllers/category.controller.js"

const router = express.Router()

//routes

//create category (POST)
router.post("/create", isAuth, createCategoryController)
//get all categories (GET)
router.get("/get-all", getAllCategoriesController)
//delete category (DELETE)
router.delete("/delete/:id", isAuth, deleteCategoryController)

export default router