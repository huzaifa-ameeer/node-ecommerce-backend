import express from "express"
import isAuth, { isAdmin } from "../middleware/auth.middleware.js"
import { createCategoryController, deleteCategoryController, getAllCategoriesController, updateCategoryController } from "../controllers/category.controller.js"

const router = express.Router()

//routes

//create category (POST)
router.post("/create", isAuth, isAdmin, createCategoryController)
//get all categories (GET)
router.get("/get-all", getAllCategoriesController)
//delete category (DELETE)
router.delete("/delete/:id", isAuth, isAdmin,deleteCategoryController)
//update category (PUT)
router.put("/update/:id", isAuth, isAdmin,updateCategoryController)

export default router