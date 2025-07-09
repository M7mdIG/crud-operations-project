import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../config/data-source";
import { User } from "../entities/User";

const userRepo = AppDataSource.getRepository(User);

/*
 * Create a new user
 */
export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      res.status(400).json({ error: "Name and email are required" });
      return;
    }

    const existing = await userRepo.findOneBy({ email });
    if (existing) {
      res.status(409).json({ error: "Email already in use" });
      return;
    }

    const newUser = userRepo.create({ name, email });
    const saved = await userRepo.save(newUser);
    res.status(201).json(saved);
  } catch (err) {
    next(err);
  }
};

/*
 * Get all users (with device assignments)
 */
export const getAllUsers = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await userRepo.find({
      relations: ["assignments", "assignments.device"],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
};

/*
 * Get a specific user by ID
 */
export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id, 10);
    const user = await userRepo.findOne({
      where: { id },
      relations: ["assignments", "assignments.device"],
    });

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    res.json(user);
  } catch (err) {
    next(err);
  }
};

/*
 * Update a user (name and/or email)
 */
export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id, 10);
    const user = await userRepo.findOneBy({ id });

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    const { name, email } = req.body;

    if (email && email !== user.email) {
      const taken = await userRepo.findOneBy({ email });
      if (taken) {
        res.status(409).json({ error: "Email already in use" });
        return;
      }
      user.email = email;
    }

    if (name) user.name = name;

    const updated = await userRepo.save(user);
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

/*
 * Delete a user
 */
export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id, 10);
    const user = await userRepo.findOneBy({ id });

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    await userRepo.remove(user);
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    next(err);
  }
};
