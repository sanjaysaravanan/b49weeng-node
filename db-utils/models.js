import mongoose from "mongoose";

// todos

// users
const usersSchema = new mongoose.Schema({
  userId: {
    type: "string",
    required: true,
  },
  name: {
    type: "string",
    required: true,
  },
  email: {
    type: "string",
    required: true,
  },
  dob: {
    type: "string",
    required: true,
  },
  imageUrl: {
    type: "string",
    required: true,
  },
  password: {
    type: "string",
    required: true,
  },
  isAccountVerified: {
    type: "boolean",
    required: true,
  },
});

const userModel = new mongoose.model("user", usersSchema, "users");

export { userModel };
