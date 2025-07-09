import { Router } from "express";
import {
  assignUserToDevice,
  updateAssignment,
  deleteAssignment,
} from "../controllers/assignment.controller";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Assignments
 *   description: Assign or unassign users to devices
 */

/**
 * @swagger
 * /assignments:
 *   post:
 *     summary: Assign a user to a device
 *     tags: [Assignments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - deviceId
 *               - accessLevel
 *             properties:
 *               userId:
 *                 type: integer
 *               deviceId:
 *                 type: integer
 *               accessLevel:
 *                 type: string
 *                 example: owner
 *     responses:
 *       201:
 *         description: Assignment created successfully
 *       400:
 *         description: Missing or invalid data
 *       409:
 *         description: Duplicate assignment
 */
router.post("/", assignUserToDevice);

/**
 * @swagger
 * /assignments/{id}:
 *   put:
 *     summary: Update a device assignment's access level
 *     tags: [Assignments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - accessLevel
 *             properties:
 *               accessLevel:
 *                 type: string
 *                 example: viewer
 *     responses:
 *       200:
 *         description: Assignment updated
 *       404:
 *         description: Assignment not found
 */
router.put("/:id", updateAssignment);

/**
 * @swagger
 * /assignments/{id}:
 *   delete:
 *     summary: Unassign a user from a device
 *     tags: [Assignments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Assignment deleted
 *       404:
 *         description: Assignment not found
 */
router.delete("/:id", deleteAssignment);

export default router;
