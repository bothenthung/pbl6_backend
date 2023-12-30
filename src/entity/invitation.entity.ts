import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne
} from "typeorm"
import { BaseEntity } from "../types/baseEntity"
import { Project } from "./project.entity"
import { User } from "./user.entity"

export enum InvitationStatus {
  Accepted = 'accepted',
  Pending = 'pending',
  Reject = 'reject',
}

@Entity("invitation")

export class InvitationEntity extends BaseEntity {
  @Column({ type: "text", nullable: true })
  message: string

  @Column({ type: "text", nullable: false })
  userSendId: string

  @Column({ type: "text", nullable: true })
  userReceiveId: string

  @Column({ type: "text", nullable: false })
  projectID: string

  @ManyToOne(() => User , (user) => user.sendInvitations)
  @JoinColumn({ name: "userSendId" , referencedColumnName: 'userID'})
  userSend: User

  @ManyToOne(() => User , (user) => user.receiveInvitations)
  @JoinColumn({ name: "userReceiveId" , referencedColumnName: 'userID'})
  userReceive: User

  @ManyToOne(() => Project , (project) => project.userProjects)
  @JoinColumn({ name: "projectID" , referencedColumnName: 'projectID'})
  project: Project

  status: InvitationStatus
}
