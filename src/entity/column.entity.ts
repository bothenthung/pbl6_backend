import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm"
import { Project } from "./project.entity"
import { Task } from "./task.entity"

@Entity("columns")
export class Columns {
  @PrimaryGeneratedColumn("uuid")
  columnID: string

  @Column({ type: "text", nullable: true })
  title: string

  @Column()
  index: number

  @ManyToOne(() => Project, (project) => project.columns)
  @JoinColumn({ name: "projectID" })
  project: Project

  @OneToMany(() => Task, (task) => task.column)
  tasks: Task[]
}
