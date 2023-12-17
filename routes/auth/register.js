import express from "express";
import bcrypt from "bcrypt";
import { userModel } from "../../db-utils/models.js";

const registerRouter = express.Router();

// api for creating an user ( registering an user in DB )
registerRouter.post("/", async (req, res) => {
  const { body } = req; // this will give use the info sent by the User
  const { email } = body;

  try {
    const existingUser = await userModel.findOne({ email: email });

    if (existingUser) {
      res.status(409).send({ msg: "User already exists" });
      return;
    }

    // object before encryption
    const objectbody = {
      ...body,
      userId: Date.now().toString(),
    };

    const user = new userModel(objectbody);

    await user.validate();

    // encrypt the password user
    const hashedPasswd = bcrypt.hashSync(body.password, 10);

    await userModel.create({ ...objectbody, password: hashedPasswd });

    res.send({ msg: "User Created Successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: "Error Occured while Creating an user" });
  }
});

export default registerRouter;
