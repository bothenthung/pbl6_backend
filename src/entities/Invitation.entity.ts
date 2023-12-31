import {
  Column,
  Entity
} from "typeorm"
import { BaseAttributes } from "./attributes/BaseAttributes";

export enum EInvitationStatus {
  ACCEPTED = 'accepted',
  PENDING = 'pending',
  REJECT = 'reject',
}

@Entity("invitations")
export class InvitationEntity extends BaseAttributes {
  @Column({ type: "text", nullable: true })
  message: string

  @Column({ name: "sender_id", type: "uuid", nullable: false })
  senderId: string

  @Column({ name: "reveiver_id", type: "uuid", nullable: false })
  receiverId: string

  @Column({ name: "project_id", type: "uuid", nullable: false })
  projectId: string

  @Column({
    type: "enum",
    enum: EInvitationStatus,
    default: EInvitationStatus.PENDING
  })
  status: EInvitationStatus
}
