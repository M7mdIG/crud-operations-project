import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { DeviceAssignment } from "./DeviceAssignment";

/*
 * The User entity represents a person using the system.
 * A user can be assigned to many devices through DeviceAssignment.
 */
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  // One user can have many device assignments
  @OneToMany(() => DeviceAssignment, assignment => assignment.user)
  assignments!: DeviceAssignment[];
}
