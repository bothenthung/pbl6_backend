import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm"
import { Project } from "./project.entity"

@Entity("columns")
export class Columns {
  @PrimaryGeneratedColumn("uuid")
  columnID: string

  @Column()
  title: string

  @Column()
  index: number

  @ManyToOne(() => Project, (project) => project.columns)
  @JoinColumn({ name: "projectID" })
  project: Project
}
