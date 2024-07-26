import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

// import express from "express";
// const app = express();

const connectDB = async () => {
  try {
    const connectInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log(`/n MongoDB connected!! DB HOST: ${connectInstance.connection.host}`);
    // app.on("error", (error) => {
    //   console.log("our application not able to talk to database", error);
    //   throw error;
    // });
  } catch (error) {
    console.log("MONGODB connection FAILED ", error);
    process.exit(1);
  }
};

export default connectDB;