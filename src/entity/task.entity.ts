import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm"
import { Columns } from "./column.entity"
import { User } from "./user.entity"

@Entity("task")
export class Task {
  @PrimaryGeneratedColumn("uuid")
  taskID: string

  @Column({ type: "text", nullable: true })
  title: string

  @Column({ type: "text", nullable: true })
  description: string

  @Column()
  index: number

  @CreateDateColumn({ type: "timestamp" })
  created_at: Date

  @Column()
  deadline_date: Date

  @ManyToOne(() => Columns, (column) => column.tasks)
  @JoinColumn({ name: "columnID" })
  column: Columns

  @ManyToOne(() => User, (user) => user.tasks)
  @JoinColumn({ name: "userID" })
  user: User
}
