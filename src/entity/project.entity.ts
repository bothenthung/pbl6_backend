import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm"
import { User } from "./user.entity"
import { Columns } from "./column.entity"

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

  @OneToMany(() => Columns, (column) => column.project)
  columns: Columns[]
}
