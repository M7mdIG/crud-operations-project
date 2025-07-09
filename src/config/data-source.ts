import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";

import { User } from "../entities/User";
import { Device } from "../entities/Device";
import { DeviceAssignment } from "../entities/DeviceAssignment";

dotenv.config();

/**
 * TypeORM data source configuration for PostgreSQL.
 * Synchronize should be disabled in production to avoid unintended schema changes.
 */
export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true, // disable in production
  logging: true,
  entities: [User, Device, DeviceAssignment],
});
