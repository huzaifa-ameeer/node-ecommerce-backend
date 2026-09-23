import express from "express";
import {
  createProductController,
  deleteProductController,
  deleteProductImageController,
  getAllProductsController,
  getSingleProductController,
  updateProductController,
  updateProductImageController,
} from "../controllers/product.controller.js";
import isAuth, { isAdmin } from "../middleware/auth.middleware.js";
import singleUpload from "../middleware/multer.js";

const router = express.Router();

//routes

//get all products (GET)
router.get("/get-all", getAllProductsController);
//get single product (GET)
router.get("/:id", getSingleProductController);
// //create product (POST)
router.post("/create", isAuth, isAdmin, singleUpload, createProductController);
//update product (PUT)
router.put("/update/:id", isAuth, isAdmin, updateProductController);
//update product image (PUT)
router.put(
  "/update-image/:id",
  isAuth,
  isAdmin,
  singleUpload,
  updateProductImageController,
);
//delete product image(DEL)
router.delete(
  "/delete-product-image/:id/:public_id",
  isAuth,
  isAdmin,
  deleteProductImageController,
);
//delete product (DEL)
router.delete("/delete-product/:id", isAuth, isAdmin, deleteProductController);

//exports
export default router;
