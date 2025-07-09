import { Router } from "express";
import {
  createDevice,
  getAllDevices,
  getDeviceById,
  updateDevice,
  deleteDevice,
} from "../controllers/device.controller";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Devices
 *   description: Operations related to devices
 */

/**
 * @swagger
 * /devices:
 *   post:
 *     summary: Create a new device
 *     tags: [Devices]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - serialNumber
 *               - model
 *               - type
 *             properties:
 *               serialNumber:
 *                 type: string
 *               model:
 *                 type: string
 *               type:
 *                 type: string
 *                 example: laptop
 *     responses:
 *       201:
 *         description: Device created successfully
 *       400:
 *         description: Missing or invalid data
 *       409:
 *         description: Duplicate serial number
 */
router.post("/", createDevice);

/**
 * @swagger
 * /devices:
 *   get:
 *     summary: Get all devices
 *     tags: [Devices]
 *     responses:
 *       200:
 *         description: List of all devices
 */
router.get("/", getAllDevices);

/**
 * @swagger
 * /devices/{id}:
 *   get:
 *     summary: Get a device by ID
 *     tags: [Devices]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Device found
 *       404:
 *         description: Device not found
 */
router.get("/:id", getDeviceById);

/**
 * @swagger
 * /devices/{id}:
 *   put:
 *     summary: Update a device
 *     tags: [Devices]
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
 *             properties:
 *               serialNumber:
 *                 type: string
 *               model:
 *                 type: string
 *               type:
 *                 type: string
 *     responses:
 *       200:
 *         description: Device updated
 *       404:
 *         description: Device not found
 *       409:
 *         description: Serial number conflict
 */
router.put("/:id", updateDevice);

/**
 * @swagger
 * /devices/{id}:
 *   delete:
 *     summary: Delete a device
 *     tags: [Devices]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Device deleted
 *       404:
 *         description: Device not found
 */
router.delete("/:id", deleteDevice);

export default router;
