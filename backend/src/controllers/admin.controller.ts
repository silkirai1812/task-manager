import { Request, Response } from "express";
import User from "../models/user.model";
import Task from "../models/task.model";

export const getAllUsers = async (req: Request, res: Response) => {
  const users = await User.find().select("-password");
  res.json(users);
};

export const getAllTasks = async (req: Request, res: Response) => {
  const tasks = await Task.find().populate("user", "name email");
  res.json(tasks);
};