let http = require("http");

const server = http.createServer((req, res) => {
  // req
  // request that in coming to the server
  // res
  // response that is out going from the server
  res.writeHead(200, { batch: "B49WEENG" });
  res.end("<h1>Hello world</h1>");
});

server.listen(8000, () => {
  console.log("server listening on port 8000");
});
