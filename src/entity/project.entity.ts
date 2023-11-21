import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm"
import { User } from "./user.entity"

@Entity("project")
export class Project {
  @PrimaryGeneratedColumn("uuid")
  projectID: string

  @Column()
  title: string

  @CreateDateColumn({ type: "timestamp" })
  created_at: Date

  @ManyToMany(() => User, { eager: true })
  @JoinTable()
  users: User[]
}
