// const express = require("express");
import express from "express";

// cjs importing custom module
// const todosRouter = require("./routes/todos");

// mjs importing custom module
import todosRouter from "./routes/todos.js";
import usersRouter from "./routes/users.js";
import connectToDb from "./db-utils/mongoose-connection.js";

const server = express();

// await in the top-level / global scope is allowed
await connectToDb();

// middleware to process the body of the request
server.use(express.json()); // used to parse the body of the request

// usage of express router
server.use("/api/todos", todosRouter);
server.use("/api/users", usersRouter);

// sample home api
server.get("/", (req, res) => {
  res.send({ msg: "Hello world by Express!" });
  // res.send("<h1>Hello By Express</h1>");
});

const port = 8000;

server.listen(port, () => {
  console.log("listening on port " + port);
});
