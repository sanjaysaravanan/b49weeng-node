// const express = require("express");
import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
// cjs importing custom module
// const todosRouter = require("./routes/todos");

// mjs importing custom module
import todosRouter from "./routes/todos.js";
import usersRouter from "./routes/users.js";
import registerRouter from "./routes/auth/register.js";
import connectToDb from "./db-utils/mongoose-connection.js";
import loginRouter from "./routes/auth/login.js";

const server = express();

// await in the top-level / global scope is allowed
await connectToDb();

// middleware to process the body of the request
server.use(express.json()); // used to parse the body of the request
// middleware used to make our APIs cors compatible
server.use(cors());

// Logging middleware - used to log the request incoming at what time
const logger = (req, res, next) => {
  console.log("##", new Date().toISOString(), "##", req.url, " ", req.method);

  // next - go to the logic in routing
  next();
  // console.log(
  //   "## Request Completed at",
  //   new Date().toISOString(),
  //   "##",
  //   req.url,
  //   " ",
  //   req.method
  // );
};

// public apis ( /login, /register ) - open to everyone
// middleware to authorize the private apis ( /users, /todos )
// should be open only the logged in user whose is having a proper session
const authorizationMiddleware = (req, res, next) => {
  console.log("authorization middleware", req.headers);

  const authToken = req.headers["auth-token"];

  try {
    jwt.verify(authToken, process.env.JWT_SECRET);
    next();
  } catch (err) {
    console.log(err);
    res.status(401).send({ msg: "Unauthorized User" });
  }
};

server.use(logger);

// this line will make all apis private even the /login /register
// server.use(authorizationMiddleware);

// usage of express router
// adding the middleware as the second argument so the middleware is particular to specific apis
server.use("/api/todos", authorizationMiddleware, todosRouter);
server.use("/api/users", authorizationMiddleware, usersRouter);
server.use("/api/register", registerRouter);
server.use("/api/login", loginRouter);

// sample home api
server.get("/", (req, res) => {
  res.send({ msg: "Hello world by Express!" });
  // res.send("<h1>Hello By Express</h1>");
});

const port = 8000;

server.listen(port, () => {
  console.log("listening on port " + port);
});
