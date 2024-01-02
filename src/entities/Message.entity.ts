import {
  Column,
  Entity,
  ManyToOne,
} from "typeorm"
import { BaseAttributes } from "./attributes/BaseAttributes";
import { UserEntity } from "./User.entity";

@Entity("messages")
export class MessageEntity extends BaseAttributes {
  @Column({ type: "text", nullable: true })
  message: string

  @Column({ name: "sender_id", type: "uuid", nullable: false })
  senderId: string

  @Column({ name: "receiver_id", type: "uuid", nullable: true })
  receiverId: string | null

  @Column({ name: "project_id", nullable: false })
  projectId: string

  @ManyToOne(type => UserEntity, user => user.messages)
  receiver: UserEntity
}
