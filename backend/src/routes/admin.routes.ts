import express from "express";
import { protect } from "../middleware/auth.middleware";
import { isAdmin } from "../middleware/admin.middleware";
import { getAllUsers, getAllTasks } from "../controllers/admin.controller";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin only routes
 *
 * /admin/users:
 *   get:
 *     summary: Get all users - admin only
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all users
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admin access required
 *
 * /admin/tasks:
 *   get:
 *     summary: Get all tasks from all users - admin only
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all tasks
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admin access required
 */

router.get("/users", protect, isAdmin, getAllUsers);
router.get("/tasks", protect, isAdmin, getAllTasks);

export default router;