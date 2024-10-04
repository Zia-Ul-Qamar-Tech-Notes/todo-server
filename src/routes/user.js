import mongoose from "mongoose";
import { UserModel } from "../models/User.js";
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

router.get("/", (req, res) => {
  res.json("Welcome to Auth");
});

router.post("/login", async (req, res) => {
  const { name, password } = req.body;
  const data = await UserModel.findOne({ name });
  console.log(data);
  if (!data) {
    return res.json("User does not available, Please Register");
  }
  const isValidPassword = await bcrypt.compare(password, data.password);
  if (!isValidPassword) {
    res.json("Username or Password is invalid");
  }
  const token = jwt.sign({ id: UserModel._id }, "secret");

  res.json({ token, data });
});

router.post("/register", async (req, res) => {
  const { name, password } = req.body;
  const data = await UserModel.findOne({ name });
  console.log(data);
  if (data) {
    return res.json("User already available");
  }
  const hashedPass = await bcrypt.hash(password, 10);
  const saveData = new UserModel({ name, password: hashedPass });
  await saveData.save();
  return res.json(saveData);
});

export { router as UserRouter };

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorize;
  if (token) {
    jwt.verify(token, "secret", (err) => {
      if (err) {
        return res.sendStatus(403);
      }
      next();
    });
  } else {
    res.sendStatus(401);
  }
};
