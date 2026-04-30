import { Request, Response } from "express";
import Task from "../models/task.model";
import {
  suggestPriorityAI,
  generateSummaryAI
} from "../utils/ai.utils";

export const createTask = async (req: any, res: Response) => {
  try {
    let { title, description, status, priority, dueDate } = req.body;

    let aiPriority = priority;
    let summary = "";

    try {
      const [suggestedPriority, generatedSummary] = await Promise.all([
        priority ? Promise.resolve(priority) : suggestPriorityAI(description),
        generateSummaryAI(description)
      ]);

      aiPriority = suggestedPriority;
      summary = generatedSummary;

    } catch {
      console.log("AI failed, using fallback");
    }

    const task = await Task.create({
      title,
      description,
      status,
      priority: aiPriority,
      dueDate,
      summary,
      user: req.user.id
    });

    res.status(201).json(task);

  } catch (error) {
    res.status(500).json({ message: "Error creating task" });
  }
};

export const getTasks = async (req: any, res: Response) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error });
  }
};

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

export const updateTask = async (req: any, res: Response) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ message: "Task not found" });

    if (task.user!.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not allowed" });
    }

    const { title, description, status, priority, dueDate } = req.body;
    let updatedData: any = { title, description, status, priority, dueDate };

    Object.keys(updatedData).forEach(
      key => updatedData[key] === undefined && delete updatedData[key]
    );

    if (description) {
      try {
        const [summary, suggestedPriority] = await Promise.all([
          generateSummaryAI(description),
          priority ? Promise.resolve(priority) : suggestPriorityAI(description)
        ]);

        updatedData.summary = summary;
        updatedData.priority = suggestedPriority;

      } catch {
        console.log("AI update failed, keeping existing values");
      }
    }

    const updated = await Task.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    res.json(updated);

  } catch (error) {
    res.status(500).json({ message: "Error updating task" });
  }
};

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