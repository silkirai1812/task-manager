import express from "express";
import { protect } from "../middleware/auth.middleware";
import { getTaskAnalytics } from "../controllers/analytics.controller";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Analytics
 *   description: Task analytics for logged in user
 *
 * /analytics/tasks:
 *   get:
 *     summary: Get task analytics - total, completed, pending counts
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Analytics data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalTasks:
 *                   type: number
 *                   example: 10
 *                 completed:
 *                   type: number
 *                   example: 4
 *                 pending:
 *                   type: number
 *                   example: 6
 *       401:
 *         description: Unauthorized
 */

router.get("/tasks", protect, getTaskAnalytics);

export default router;