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
    dbName: "checking",
  });

connectDB().then(console.log("Connected to DB"));

app.use(express.json());
app.use(
  cors({
    origin: "https://todoclient.z23.web.core.windows.net",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // If using cookies or authentication
  })
);
// {
//   origin: "https://todofrontend.z30.web.core.windows.net/",
//   methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//   credentials: true, // If using cookies or authentication
// }

app.use("/auth", UserRouter);
app.use("/todo", todoRouter);

app.listen(port, () =>
  console.log("> Server is up and running on port : " + port)
);
