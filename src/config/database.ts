import Config from "../config";
import { connect } from "mongoose";
import redis from 'redis';

const connectDB = async (mongoURI:string) => {
  try {
    await connect(mongoURI);
    console.log("MongoDB Connected...");
  } catch (err) {
    if (err instanceof Error) {
        console.error(err.message);
      }
    // Exit process with failure
    process.exit(1);
  }
};
export default connectDB;