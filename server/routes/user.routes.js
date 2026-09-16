import express from "express";
import {
  loginController,
  logoutController,
  registerController,
  updatePasswordController,
  updateUserController,
  userProfileController,
} from "../controllers/user.controller.js";
import isAuth from "../middleware/auth.middleware.js";

const router = express.Router();

//routes

//register user (POST)
router.post("/register", registerController);
//login user (POST)
router.post("/login", loginController);
//user profile (GET)
router.get("/profile", isAuth, userProfileController);
//logout user (GET)
router.get("/logout", logoutController);
//update user (PUT)
router.put("/update-profile", isAuth, updateUserController);
//update password (PUT)
router.put("/update-password", isAuth, updatePasswordController);


//exports
export default router;
