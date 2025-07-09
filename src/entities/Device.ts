import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { DeviceAssignment } from "./DeviceAssignment";

/*
 * The Device entity represents any physical or virtual device.
 * A device can be assigned to many users through DeviceAssignment.
 */
@Entity()
export class Device {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  serialNumber!: string;

  @Column()
  model!: string;

  @Column()
  type!: string; // e.g., "laptop", "tablet", "phone"

  @OneToMany(() => DeviceAssignment, assignment => assignment.device)
  assignments!: DeviceAssignment[];
}
