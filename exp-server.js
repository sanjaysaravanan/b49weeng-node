const express = require("express");

const server = express();

server.get("/", (req, res) => {
  // res.send({ msg: "Hello world by Express!" });
  res.send("<h1>Hello By Express</h1>");
});

const port = 8000;

server.listen(port, () => {
  console.log("listening on port " + port);
});
