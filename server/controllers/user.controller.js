import userModel from "../models/user.model.js";
import { getDataUri } from "../utils/feature.js";
import { v2 as cloudinary } from "cloudinary";

//register controller
export const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "missing details",
        success: false,
      });
    }
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message: "email already taken",
        success: false,
      });
    }
    const user = await userModel.create({
      name,
      email,
      password,
    });
    return res.status(201).json({
      message: "user registered successfully",
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "internal server error",
      error,
    });
  }
};

//login controller
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "missing details",
        success: false,
      });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "email does not exist",
      });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        message: "incorrect password",
        success: false,
      });
    }
    const token = user.generateToken();

    res
      .status(200)
      .cookie("token", token, {
        expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        httpOnly: true,
      })
      .json({
        message: "login successful",
        success: true,
        user,
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "internal server error",
      success: false,
    });
  }
};

//user profile controller
export const userProfileController = async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id);
    user.password = undefined;
    return res.status(200).json({
      message: "user profile fetched successfully",
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "internal server error",
      success: false,
    });
  }
};

//logout user controller
export const logoutController = async (req, res) => {
  try {
    return res
      .status(200)
      .clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      })
      .json({
        message: "user logout successful",
        success: true,
      });
  } catch (error) {
    return res.status(500).json({
      message: "internal server error",
      success: false,
    });
  }
};

//update user info controller
export const updateUserController = async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = await userModel.findById(req.user._id);

    if (name) user.name = name;
    if (email) user.email = email;

    await user.save();

    return res.status(200).json({
      message: "user updated successfully",
      success: true,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "internal server error",
      success: false,
    });
  }
};

//update password controller
export const updatePasswordController = async (req, res) => {
  try {
    const user = req.user;
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      return res.status(400).json({
        message: "please fill out all fields",
        success: false,
      });
    }
    const isMatch = await user.comparePassword(oldPassword);
    if (!isMatch) {
      return res.status(401).json({
        message: "incorrect password",
        success: false,
      });
    }

    if (oldPassword == newPassword) {
      return res.status(400).json({
        message: "password should not be same",
      });
    }

    user.password = newPassword;
    await user.save();

    return res.status(200).json({
      message: "password updated successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "internal server error",
      success: false,
    });
  }
};

//update user profile pic controller
export const updateProfilePicController = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "profile picture file is required",
        success: false,
      });
    }

    const user = await userModel.findById(req.user._id);

    //get a file from user
    const file = getDataUri(req.file);

    //delete previous pic if exists
    if (user.profilePic && user.profilePic.public_id) {
      await cloudinary.uploader.destroy(user.profilePic.public_id);
    }

    //update current pic
    const cdb = await cloudinary.uploader.upload(file.content);
    user.profilePic = {
      public_id: cdb.public_id,
      url: cdb.secure_url,
    };
    //save
    await user.save();
    return res.status(200).json({
      message: "profile pic updated successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "internal server error",
      error,
      success: false,
    });
  }
};
