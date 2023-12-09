import express from "express";
import { userModel } from "../db-utils/models.js";

const usersRouter = express.Router();

// Get all Users
usersRouter.get("/", async (req, res) => {
  try {
    const users = await userModel.find({}, { _id: 0, __v: 0 });
    res.send(users);
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: "Error in fetching the users data" });
  }
});

// get single user
usersRouter.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await userModel.findOne({ userId }, { _id: 0, __v: 0 });
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: "Error in fetching the user data" });
  }
});

// create a new User
usersRouter.post("/", async (req, res) => {
  const { body } = req;

  try {
    const newuser = await new userModel({
      ...body,
      userId: Date.now().toString(),
    });
    await newuser.save(); // inserting a new user
    res.send({ msg: "User Created Successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: "Error Occured while Creating an user" });
  }
});

// updating an user
usersRouter.put("/:userId", async (req, res) => {
  const { body } = req;
  const { userId } = req.params;

  try {
    const newBody = {
      ...body,
      userId,
    };

    // ToDo: validation not working wil comeback on this
    await new userModel(newBody);

    await userModel.updateOne({ userId }, { $set: newBody });

    res.send({ msg: "User Updated Successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: "Error Occured while updating an user" });
  }
});

// delete single user
usersRouter.delete("/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await userModel.findOne({ userId: userId });

    if (user) {
      await userModel.deleteOne({ userId });
      res.send({ msg: "User deleted successfully" });
    } else {
      res.status(404).send({ msg: "User not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: "Error in deleting the user" });
  }
});

export default usersRouter;
