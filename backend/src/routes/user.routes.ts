import express from "express";
import { getProfile, updateProfile } from "../controllers/user.controller";
import { protect } from "../middleware/auth.middleware";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User profile management
 *
 * /users/profile:
 *   get:
 *     summary: Get logged in user profile
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile data
 *       401:
 *         description: Unauthorized
 *
 *   put:
 *     summary: Update logged in user profile
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Updated
 *               email:
 *                 type: string
 *                 example: johnupdated@example.com
 *     responses:
 *       200:
 *         description: Profile updated
 *       401:
 *         description: Unauthorized
 */


router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);

export default router;