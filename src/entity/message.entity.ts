import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne
} from "typeorm"
import { BaseEntity } from "../types/baseEntity"
import { Project } from "./project.entity"
import { User } from "./user.entity"

@Entity("message")

export class MessageEntity extends BaseEntity {
  @Column({ type: "text", nullable: true })
  message: string

  @Column({ type: "text", nullable: false })
  userSendId: string

  @Column({ type: "text", nullable: true })
  userReceiveId: string

  @Column({ type: "text", nullable: false })
  projectID: string

  @ManyToOne(() => User , (user) => user.sendMessages)
  @JoinColumn({ name: "userSendId" , referencedColumnName: 'userID'})
  userSend: User

  @ManyToOne(() => User , (user) => user.receiveMessages)
  @JoinColumn({ name: "userReceiveId" , referencedColumnName: 'userID'})
  userReceive: User

  @ManyToOne(() => Project , (project) => project.userProjects)
  @JoinColumn({ name: "projectID" , referencedColumnName: 'projectID'})
  project: Project
}
