import mongoose  from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const url: string = process.env.MONGO_DB_URL || "null";

export const connectToDatabase = async () => {
  try {
    mongoose.connect(`${url}/${process.env.MONGO_DB_NAME}`);
    console.log("Connected to database!");
  } catch (error) {
    console.log("Error connecting to database:", error);
  }
};
