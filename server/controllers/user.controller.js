import userModel from "../models/user.model.js";

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
        secure: process.env.NODE_ENV === "development" ? true : false,
        sameSite: process.env.NODE_ENV === "development" ? true : false,
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
        const user = await userModel.findById(req.user._id)
        user.password = undefined
        return res.status(200).json({
            message: "user profile fetched successfully",
            success: true,
            user
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "internal server error",
            sucess: false,
            
        })
    }
}