import {
  Column,
  Entity,
  ManyToOne
} from "typeorm"
import { BaseEntity } from "../types/baseEntity"
import { Project } from "./project.entity"
import { User } from "./user.entity"

@Entity("message")

export class MessageEntity extends BaseEntity {
  @Column({ type: "text", nullable: true })
  message: string

  @ManyToOne(() => User, user => user.messages)
  user: User;

  @ManyToOne(() => Project, project => project.messages)
  project: Project;
}
