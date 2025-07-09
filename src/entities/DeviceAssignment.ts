import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";
import { Device } from "./Device";

/*
 * This join table connects Users and Devices.
 * Each row represents a user assigned to a device, with metadata like role and timestamp.
 */
@Entity()
export class DeviceAssignment {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  accessLevel!: string; // e.g., "owner", "viewer"

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  assignedAt!: Date;

  @ManyToOne(() => User, user => user.assignments)
  user!: User;

  @ManyToOne(() => Device, device => device.assignments)
  device!: Device;
}
