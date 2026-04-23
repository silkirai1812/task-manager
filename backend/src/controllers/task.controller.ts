// import { Request, Response } from "express";
// import Task from "../models/task.model";
// import {
//   suggestPriorityAI,
//   generateSummaryAI
// } from "../utils/ai.utils";

// // CREATE TASK
// // export const createTask = async (req: any, res: Response) => {
// //   try {
// //     const task = await Task.create({
// //       ...req.body,
// //       user: req.user.id
// //     });

// //     res.status(201).json(task);
// //   } catch (error) {
// //     res.status(500).json({ error });
// //   }
// // };

// export const createTask = async (req: any, res: Response) => {
//   try {
//     let { title, description, status, priority, dueDate } = req.body;

//     let aiPriority = priority;
//     let summary = "";
//     try {
//       if (!priority) {
//         aiPriority = await suggestPriorityAI(description);
//       }

//       summary = await generateSummaryAI(description);
//       // console.log("AI SUMMARY:", summary); 

//     } catch {
//       console.log("AI failed, using fallback");
//     }

//     const task = await Task.create({
//       title,
//       description,
//       status,
//       priority: aiPriority,
//       dueDate,
//       summary, // ✅ correct place
//       user: req.user.id
//     });

//     res.status(201).json(task);

//   } catch (error) {
//     res.status(500).json({ message: "Error creating task" });
//   }
// };




// // GET ALL TASKS (only user's tasks)
// export const getTasks = async (req: any, res: Response) => {
//   try {
//     const tasks = await Task.find({ user: req.user.id });
//     res.json(tasks);
//   } catch (error) {
//     res.status(500).json({ error });
//   }
// };

// // GET SINGLE TASK
// export const getTaskById = async (req: any, res: Response) => {
//   try {
//     const task = await Task.findById(req.params.id);

//     if (!task) return res.status(404).json({ message: "Task not found" });
//     if (task.user!.toString() !== req.user.id) {
//       return res.status(403).json({ message: "Not allowed" });
//     }

//     res.json(task);
//   } catch (error) {
//     res.status(500).json({ error });
//   }
// };

// // UPDATE TASK
// // export const updateTask = async (req: any, res: Response) => {
// //   try {
// //     const task = await Task.findById(req.params.id);

// //     if (!task) return res.status(404).json({ message: "Task not found" });

// //     if (task.user!.toString() !== req.user.id) {
// //       return res.status(403).json({ message: "Not allowed" });
// //     }

// //     const updated = await Task.findByIdAndUpdate(
// //       req.params.id,
// //       req.body,
// //       { new: true }
// //     );

// //     res.json(updated);
// //   } catch (error) {
// //     res.status(500).json({ error });
// //   }
// // };
// export const updateTask = async (req: any, res: Response) => {
//   try {
//     const task = await Task.findById(req.params.id);

//     if (!task) return res.status(404).json({ message: "Task not found" });

//     if (task.user!.toString() !== req.user.id) {
//       return res.status(403).json({ message: "Not allowed" });
//     }

//     let updatedData = { ...req.body };

//     // 🤖 AI UPDATE ONLY IF DESCRIPTION CHANGED
//     if (req.body.description) {
//       try {
//         const summary = await generateSummaryAI(req.body.description);
//         updatedData.summary = summary;

//         // OPTIONAL: update priority also
//         const aiPriority = await suggestPriorityAI(req.body.description);
//         updatedData.priority = aiPriority;

//       } catch {
//         console.log("AI update failed");
//       }
//     }

//     const updated = await Task.findByIdAndUpdate(
//       req.params.id,
//       updatedData,
//       { new: true }
//     );

//     res.json(updated);

//   } catch (error) {
//     res.status(500).json({ error });
//   }
// };

// // DELETE TASK
// export const deleteTask = async (req: any, res: Response) => {
//   try {
//     const task = await Task.findById(req.params.id);

//     if (!task) return res.status(404).json({ message: "Task not found" });

//     if (task.user!.toString() !== req.user.id) {
//       return res.status(403).json({ message: "Not allowed" });
//     }

//     await Task.findByIdAndDelete(req.params.id);

//     res.json({ message: "Task deleted" });
//   } catch (error) {
//     res.status(500).json({ error });
//   }
// };

import { Request, Response } from "express";
import Task from "../models/task.model";
import {
  suggestPriorityAI,
  generateSummaryAI
} from "../utils/ai.utils";

// CREATE TASK
export const createTask = async (req: any, res: Response) => {
  try {
    let { title, description, status, priority, dueDate } = req.body;

    console.log("CREATE BODY:", req.body); // ADD THIS

    let aiPriority = priority;
    let summary = "";

    try {
      if (!priority) {
        aiPriority = await suggestPriorityAI(description);
      }

      summary = await generateSummaryAI(description);

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

// GET ALL TASKS
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

    let updatedData = { ...req.body };

    // Only re-run AI if description was changed
    if (req.body.description) {
      try {
        updatedData.summary = await generateSummaryAI(req.body.description);

        // Only update priority if user didn't explicitly send one
        if (!req.body.priority) {
          updatedData.priority = await suggestPriorityAI(req.body.description);
        }

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