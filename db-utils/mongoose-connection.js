import mongoose from "mongoose";

const localUri = "mongodb://localhost:27017/b49weeng-express";

const connectToDb = async () => {
  try {
    await mongoose.connect(localUri);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log("Error connecting to MongoDB", err);
    process.exit(1);
  }
};

export default connectToDb;
