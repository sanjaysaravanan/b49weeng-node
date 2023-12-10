import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // loads the variables from .env file into process.env

const dbUser = process.env.DB_USERNAME || "";
const dbPassword = process.env.DB_PASSWORD || "";
const dbName = process.env.DB_NAME || "b49weeng-express";
const dbCluster = process.env.DB_CLUSTER_NAME || "localhost:27017";

const localUri = `mongodb://${dbCluster}/${dbName}`;

const cloudUri = `mongodb+srv://${dbUser}:${dbPassword}@${dbCluster}/${dbName}?retryWrites=true&w=majority`;

const connectToDb = async () => {
  try {
    await mongoose.connect(cloudUri);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log("Error connecting to MongoDB", err);
    process.exit(1);
  }
};

export default connectToDb;
