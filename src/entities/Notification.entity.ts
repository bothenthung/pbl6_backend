import {
  Column,
  Entity,
  ManyToOne,
} from "typeorm"
import { BaseAttributes } from "./attributes/BaseAttributes";
import { UserEntity } from "./User.entity";
import { ENotificationType } from "../enums/entity-enums";

@Entity("notification")
export class NotificationEntity extends BaseAttributes {
  @Column({ type: "text", nullable: true })
  message: string

  @Column({ name: "sender_id", type: "uuid", nullable: false })
  senderId: string

  @Column({ name: "reveiver_id", type: "uuid", nullable: false })
  receiverId: string

  @Column({ name: "project_id", nullable: true })
  projectId: string

  @Column({name: "task_id", type: "uuid", nullable: true})
  taskId: string

  @Column({name: "seen_at", type: "timestamp", nullable: true, default: null})
  seetAt: Date | null

  @Column({
    type: "enum",
    enum: ENotificationType,
    default: null
  })
  type: ENotificationType | null

  @ManyToOne(type => UserEntity, user => user.notifications)
  receiver: UserEntity
}
