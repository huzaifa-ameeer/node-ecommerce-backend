import dotenv from "dotenv";
import express from "express";
import cors from "cors"
import chalk from "chalk";

dotenv.config();

const app = express();
app.use(express.json())
app.use(cors())


const port = process.env.PORT || 3000;

app.get("/test", (req, res) => {
  return res.send("Hello from server");
});

app.listen(port, () => {
  console.log(chalk.bgBlue.white(`Server running on port: ${port}`));
});
