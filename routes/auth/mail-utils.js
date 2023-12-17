import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "sanjaysaravanan00007@gmail.com",
    pass: process.env.MAIL_PASSWORD || "",
  },
});

const mailOptions = {
  from: "sanjaysaravanan00007@gmail.com",
  to: ["sanjaysaravanan1997@gmail.com"],
  subject: "Email Testing for B49WEENG",
  text: "Was it Easy or Tough",
};

// just for testing we are doing in utils
// await transporter.sendMail(mailOptions);

export { mailOptions, transporter };
