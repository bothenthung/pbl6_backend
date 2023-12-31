import {
  Column,
  Entity,
} from "typeorm"
import { BaseAttributes } from "./attributes/BaseAttributes";

@Entity("messages")
export class MessageEntity extends BaseAttributes {
  @Column({ type: "text", nullable: true })
  message: string

  @Column({ name: "sender_id", type: "uuid", nullable: false })
  senderId: string

  @Column({ name: "reveiver_id", type: "uuid", nullable: false })
  receiverId: string

  @Column({ name: "project_id", nullable: false })
  projectId: string
}
