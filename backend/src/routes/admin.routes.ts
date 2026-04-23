import express from "express";
import { protect } from "../middleware/auth.middleware";
import { isAdmin } from "../middleware/admin.middleware";
import { getAllUsers, getAllTasks } from "../controllers/admin.controller";

const router = express.Router();

router.get("/users", protect, isAdmin, getAllUsers);
router.get("/tasks", protect, isAdmin, getAllTasks);

export default router;