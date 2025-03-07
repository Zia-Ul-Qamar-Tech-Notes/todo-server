import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
  task: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: Boolean, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId },
});

export const TodoModel = mongoose.model("todo", TodoSchema);
