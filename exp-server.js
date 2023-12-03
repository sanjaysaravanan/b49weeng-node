const express = require("express");

const server = express();

// middleware to process the body of the request
server.use(express.json()); // used to parse the body of the request

server.get("/", (req, res) => {
  res.send({ msg: "Hello world by Express!" });
  // res.send("<h1>Hello By Express</h1>");
});

let todoData = [
  {
    id: "1",
    title: "Dance",
  },
  {
    id: "2",
    title: "Sleep Well",
  },
];

let rooms = [
  {
    id: "1",
    isAvaliable: true,
    price: 100,
    seats: 2,
  },
  {
    id: "1",
    isAvaliable: true,
    price: 100,
    seats: 2,
  },
];

let bookings = [
  {
    id: "2",
    roomId: "2",
    customerName: "Customer",
    date: "2015-02-23",
    startTime: "12:00:00",
  },
];

let customers = [];

// Todo APIs
// /todos (GET) ---> get all the todos
server.get("/todos", (req, res) => {
  res.send(todoData);
});

// /todos (POST) ---> create a new todo
server.post("/todos", (req, res) => {
  const { body } = req;
  const newTodo = {
    ...body,
    id: Date.now().toString(),
  };

  todoData.push(newTodo);

  res.send(newTodo);
});

// /todos/<:id> (PUT) ---> update a specific todo
server.put("/todos/:todoId", (req, res) => {
  const { body } = req;

  const { todoId } = req.params;
  console.log(todoId);

  const newTodo = {
    ...body,
    id: todoId,
  };

  // index to update the todo
  const updateIndex = todoData.findIndex(({ id }) => id === todoId);

  todoData[updateIndex] = newTodo;

  res.send(newTodo);
  // res.send({ msg: "coming soon" });
});

// todos?deleteId=1  (DELETE) ---> delete a specific todo
// can use path or query parameters for deletion
server.delete("/todos", (req, res) => {
  const { deleteId } = req.query;
  console.log(deleteId);

  // get the todo which is being deleted
  const delTodo = todoData.find((todo) => todo.id === deleteId);

  if (delTodo) {
    todoData = todoData.filter((todo) => todo.id !== deleteId);

    res.send(delTodo);
  } else {
    res.send({ msg: "Todo not found or already deleted" });
  }
});

``;

const port = 8000;

server.listen(port, () => {
  console.log("listening on port " + port);
});
