import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userModel } from "../../db-utils/models.js";
import { transporter, mailOptions } from "./mail-utils.js";
import { generateToken } from "./jwt-utils.js";

const feUrl = process.env.FE_URL || "";

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
      isAccountVerified: false,
    };

    const user = new userModel(objectbody);

    await user.validate();

    // encrypt the password user
    const hashedPasswd = bcrypt.hashSync(body.password, 10);
    await userModel.create({ ...objectbody, password: hashedPasswd });
    await transporter.sendMail({
      ...mailOptions,
      to: email,
      subject: "Resgistration Successfull",
      text: `Hi, 
      You have successfully registered. 
      Please verify your registration,
      ${feUrl}/verify?token=${generateToken({ email })}`,
    });

    res.send({ msg: "User Created Successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: "Error Occured while Creating an user" });
  }
});

registerRouter.post("/verify/:token", async (req, res) => {
  const { token } = req.params;

  try {
    const { email } = jwt.verify(token, process.env.JWT_SECRET);
    await userModel.updateOne({ email }, { $set: { isAccountVerified: true } });
    res.send({ msg: "User Verified successfully", code: 1 });
  } catch (err) {
    // err
    console.log("Error verifying token", err);
    res.status(500).send({ msg: "Invalid Token", code: 0 });
  }
  // verifying a jwt token
});

export default registerRouter;
