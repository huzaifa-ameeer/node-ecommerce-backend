import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";

//user auth
const isAuth = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({
      message: "unauthorized user",
      success: false,
    });
  }
  const decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY);

  const user = await userModel.findById(decodedData.id);

  if (!user) {
    return res.status(401).json({
      message: "user not found",
      success: false,
    });
  }

  req.user = user;
  next();
};

//admin auth
export const isAdmin = async (req, res, next) => {
  if(req.user.role !== "admin") {
    return res.status(401).json({
      message: "admin only",
      success: false
    })
  }
  next()
}

//exports
export default isAuth
