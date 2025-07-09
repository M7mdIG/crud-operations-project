import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../config/data-source";
import { DeviceAssignment } from "../entities/DeviceAssignment";
import { User } from "../entities/User";
import { Device } from "../entities/Device";

const assignmentRepo = AppDataSource.getRepository(DeviceAssignment);
const userRepo = AppDataSource.getRepository(User);
const deviceRepo = AppDataSource.getRepository(Device);

/*
 * Assign a user to a device
 */
export const assignUserToDevice = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId, deviceId, accessLevel } = req.body;

    if (!userId || !deviceId || !accessLevel) {
      res.status(400).json({ error: "userId, deviceId, and accessLevel are required" });
      return;
    }

    const user = await userRepo.findOneBy({ id: userId });
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    const device = await deviceRepo.findOneBy({ id: deviceId });
    if (!device) {
      res.status(404).json({ error: "Device not found" });
      return;
    }

    // Prevent duplicate assignment
    const existing = await assignmentRepo.findOne({
      where: { user: { id: userId }, device: { id: deviceId } },
      relations: ["user", "device"],
    });
    if (existing) {
      res.status(409).json({ error: "User is already assigned to this device" });
      return;
    }

    const assignment = assignmentRepo.create({
      user,
      device,
      accessLevel,
    });

    const saved = await assignmentRepo.save(assignment);
    res.status(201).json(saved);
  } catch (err) {
    next(err);
  }
};

/*
 * Update access level on an assignment
 */
export const updateAssignment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { accessLevel } = req.body;

    if (!accessLevel) {
      res.status(400).json({ error: "accessLevel is required" });
      return;
    }

    const assignment = await assignmentRepo.findOneBy({ id });
    if (!assignment) {
      res.status(404).json({ error: "Assignment not found" });
      return;
    }

    assignment.accessLevel = accessLevel;
    const updated = await assignmentRepo.save(assignment);
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

/*
 * Remove an assignment
 */
export const deleteAssignment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id, 10);
    const assignment = await assignmentRepo.findOneBy({ id });

    if (!assignment) {
      res.status(404).json({ error: "Assignment not found" });
      return;
    }

    await assignmentRepo.remove(assignment);
    res.json({ message: "Assignment removed successfully" });
  } catch (err) {
    next(err);
  }
};
