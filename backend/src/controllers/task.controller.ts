import { Request, Response } from "express";
import Task from "../models/task.model";
// import {
//   suggestPriorityAI,
//   generateSummaryAI
// } from "../utils/ai.utils";

// CREATE TASK
export const createTask = async (req: any, res: Response) => {
  try {
    const task = await Task.create({
      ...req.body,
      user: req.user.id
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error });
  }
};
// export const createTask = async (req: any, res: Response) => {
//   try {
//     let { title, description, status, priority, dueDate } = req.body;

//     // 🤖 CALL GEMINI
//     const aiPriority = await suggestPriorityAI(description);
//     const summary = await generateSummaryAI(description);

//     const task = await Task.create({
//       title,
//       description,
//       status,
//       priority: priority || aiPriority,
//       dueDate,
//       summary,
//       user: req.user.id
//     });
//     console.log("AI suggested priority:", aiPriority);


//     res.status(201).json(task);
//   } catch (error) {
//   console.error("FULL AI ERROR:", error); 
//   res.status(500).json({ message: "AI failed" });
// }

  

// };


// GET ALL TASKS (only user's tasks)
export const getTasks = async (req: any, res: Response) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error });
  }
};

// GET SINGLE TASK
export const getTaskById = async (req: any, res: Response) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ message: "Task not found" });
    if (task.user!.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not allowed" });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ error });
  }
};

// UPDATE TASK
export const updateTask = async (req: any, res: Response) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ message: "Task not found" });

    if (task.user!.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not allowed" });
    }

    const updated = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);
  } catch (error) {
    res.status(500).json({ error });
  }
};

// DELETE TASK
export const deleteTask = async (req: any, res: Response) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ message: "Task not found" });

    if (task.user!.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not allowed" });
    }

    await Task.findByIdAndDelete(req.params.id);

    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ error });
  }
};