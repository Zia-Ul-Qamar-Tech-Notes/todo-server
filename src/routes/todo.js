import { TodoModel } from "../models/ToDo.js";
import express from "express";
import { verifyToken } from "./user.js";

const router = express.Router();

router.post("/", verifyToken, async (req, res) => {
  const todoData = req.body;
  try {
    const saveToDo = new TodoModel(todoData);
    await saveToDo.save();
    console.log(saveToDo);
    return res.json("ToDo Added Successfully");
  } catch (error) {
    return res.json(error);
  }
});

router.get("/:userId", async (req, res) => {
  const userId = req.params.userId;
  try {
    const yourTodos = await TodoModel.find({ userId });
    // console.log(yourTodos);
    return res.json(yourTodos);
  } catch (error) {
    return res.json(error);
  }
});
router.put("/:todoId", verifyToken, async (req, res) => {
  const todoId = req.params.todoId;
  const { status } = req.body;
  console.log(req.body);
  try {
    const updatedTodo = await TodoModel.findByIdAndUpdate(
      todoId,
      {
        status: status,
      },
      { new: true }
    );

    return res.json(updatedTodo);
  } catch (error) {
    return res.json(error);
  }
});

router.delete("/:todoId", verifyToken, async (req, res) => {
  const todoId = req.params.todoId;
  try {
    const deleted = await TodoModel.findByIdAndDelete(todoId);
    res.json(deleted);
  } catch (error) {
    console.log(error);
  }
});

export { router as todoRouter };
