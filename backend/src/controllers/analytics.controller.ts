import { Response } from "express";
import Task from "../models/task.model";
import mongoose from "mongoose";

export const getTaskAnalytics = async (req: any, res: Response) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.id);

    const statusCounts = await Task.aggregate([
      { $match: { user: userId } },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 }
        }
      }
    ]);

    const priorityCounts = await Task.aggregate([
      { $match: { user: userId } },
      {
        $group: {
          _id: "$priority",
          count: { $sum: 1 }
        }
      }
    ]);

    const totalTasks = await Task.countDocuments({ user: userId });

    res.json({
      totalTasks,
      statusCounts,
      priorityCounts
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};