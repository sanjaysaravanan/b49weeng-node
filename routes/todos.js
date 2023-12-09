// const express = require("express");
import express from "express";

const todosRouter = express.Router(); // function to create routing capabilities( get, post, put ...)

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
// Todo APIs
// /todos (GET) ---> get all the todos
todosRouter.get("/", (req, res) => {
  res.send(todoData);
});

// /todos (POST) ---> create a new todo
todosRouter.post("/", (req, res) => {
  const { body } = req;
  const newTodo = {
    ...body,
    id: Date.now().toString(),
  };

  todoData.push(newTodo);

  res.send(newTodo);
});

// /todos/<:id> (PUT) ---> update a specific todo
todosRouter.put("/:todoId", (req, res) => {
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
todosRouter.delete("/", (req, res) => {
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

// cjs export statement
// module.exports = todosRouter;

// mjs/esm export statement
export default todosRouter;
