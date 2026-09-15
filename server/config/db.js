import chalk from "chalk";
import mongoose from "mongoose";

const connectDb = async (req, res) => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(chalk.bgBlue.whiteBright("DB connected successfully"));
  } catch (error) {
    console.log("DB connection failed", error);
    process.exit(1);
  }
};

export default connectDb;
