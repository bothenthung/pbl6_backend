import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne
} from "typeorm";
import { BaseAttributes } from "./attributes/BaseAttributes";
import { UserEntity } from "./User.entity";

@Entity("tasks")
export class TaskEntity extends BaseAttributes {
  @Column({ type: "text", nullable: false })
  title: string;

  @Column({ type: "text", nullable: true })
  description: string;

  @Column({ type: "tinyint" })
  index: number;

  @Column({ name: "due_date", type: "timestamp", nullable: true, default: null })
  dueDate: Date | null;

  @Column({ name: "end_date", type: "timestamp", nullable: true, default: null })
  endDate: Date | null;

  @Column({ name: "author_id", type: "uuid", nullable: false })
  authorId: string;

  @Column({ name: "assignee_id", type: "uuid", nullable: true, default: null })
  assigneeId: string | null;

  @ManyToOne(type => UserEntity, user => user.tasksCreated)
  @JoinColumn({ name: "author_id" })
  author: UserEntity;

  @ManyToOne(type => UserEntity, user => user.tasksAssigned, { nullable: true })
  @JoinColumn({ name: "assignee_id" })
  assignee?: UserEntity;
}
