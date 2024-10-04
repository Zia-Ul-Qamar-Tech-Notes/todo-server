import express from "express";
import dotenv from "dotenv";
import mongoose, { connect } from "mongoose";
import cors from "cors";
import { UserRouter } from "./routes/user.js";
import { todoRouter } from "./routes/todo.js";

const app = express();
dotenv.config();
const port = process.env.PORT || 5000;
const connectDB = async () =>
  await mongoose.connect(process.env.MONGODB_URI, {
    dbName: "ToDo",
  });

connectDB();

app.use(express.json());
app.use(cors());
app.use("/auth", UserRouter);
app.use("/todo", todoRouter);

app.listen(port, () =>
  console.log("> Server is up and running on port : " + port)
);
