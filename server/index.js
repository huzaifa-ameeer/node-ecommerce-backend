import dotenv from "dotenv";
import express from "express";
import cors from "cors"
import chalk from "chalk";
import testRoute from "./routes/test.routes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

//middlewares
app.use(express.json())
app.use(cors())


//routes
app.use("/api/v1", testRoute)


//server listening
app.listen(port, () => {
  console.log(chalk.bgWhite.whiteBright(`Server running on port: ${port}`));
});
