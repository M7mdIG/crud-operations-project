import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../config/data-source";
import { Device } from "../entities/Device";

const deviceRepo = AppDataSource.getRepository(Device);

/*
 * Create a new device
 */
export const createDevice = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { serialNumber, model, type } = req.body;

    if (!serialNumber || !model || !type) {
      res.status(400).json({ error: "serialNumber, model, and type are required" });
      return;
    }

    const existing = await deviceRepo.findOneBy({ serialNumber });
    if (existing) {
      res.status(409).json({ error: "Device with this serial number already exists" });
      return;
    }

    const newDevice = deviceRepo.create({ serialNumber, model, type });
    const saved = await deviceRepo.save(newDevice);
    res.status(201).json(saved);
  } catch (err) {
    next(err);
  }
};

/*
 * Get all devices (with assigned users)
 */
export const getAllDevices = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const devices = await deviceRepo.find({
      relations: ["assignments", "assignments.user"],
    });
    res.json(devices);
  } catch (err) {
    next(err);
  }
};

/*
 * Get a specific device by ID
 */
export const getDeviceById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id, 10);
    const device = await deviceRepo.findOne({
      where: { id },
      relations: ["assignments", "assignments.user"],
    });

    if (!device) {
      res.status(404).json({ error: "Device not found" });
      return;
    }

    res.json(device);
  } catch (err) {
    next(err);
  }
};

/*
 * Update a device
 */
export const updateDevice = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id, 10);
    const device = await deviceRepo.findOneBy({ id });

    if (!device) {
      res.status(404).json({ error: "Device not found" });
      return;
    }

    const { serialNumber, model, type } = req.body;

    if (serialNumber && serialNumber !== device.serialNumber) {
      const taken = await deviceRepo.findOneBy({ serialNumber });
      if (taken) {
        res.status(409).json({ error: "Serial number already in use" });
        return;
      }
      device.serialNumber = serialNumber;
    }

    if (model) device.model = model;
    if (type) device.type = type;

    const updated = await deviceRepo.save(device);
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

/*
 * Delete a device
 */
export const deleteDevice = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id, 10);
    const device = await deviceRepo.findOneBy({ id });

    if (!device) {
      res.status(404).json({ error: "Device not found" });
      return;
    }

    await deviceRepo.remove(device);
    res.json({ message: "Device deleted successfully" });
  } catch (err) {
    next(err);
  }
};
