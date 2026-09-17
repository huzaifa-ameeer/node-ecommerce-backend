import dotenv from "dotenv";
import express from "express";
import connectDb from "./config/db.js";
import cors from "cors"
import chalk from "chalk";
import cookieParser from "cookie-parser";
import testRoute from "./routes/test.routes.js";
import userRoute from "./routes/user.routes.js"
import { v2 as cloudinary } from "cloudinary";

//dot env config
dotenv.config();

//database connection
connectDb()

//cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
})

const app = express();
const port = process.env.PORT || 3000;

//middlewares
app.use(express.json())
app.use(cors())
app.use(cookieParser())


//routes
app.use("/api/v1", testRoute)
app.use("/api/v1/user", userRoute)


//server listening
app.listen(port, () => {
  console.log(chalk.bgYellow.whiteBright(`Server running on port: ${port}`));
});
