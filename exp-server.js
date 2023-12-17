// const express = require("express");
import express from "express";
import cors from "cors";
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

// usage of express router
server.use("/api/todos", todosRouter);
server.use("/api/users", usersRouter);
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
