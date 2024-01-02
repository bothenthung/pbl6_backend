import { Column, Entity, OneToMany } from "typeorm";
import { MessageEntity } from "./Message.entity";
import { NotificationEntity } from "./Notification.entity";
import { ProjectUserEntity } from "./ProjectUser.entity";
import { TaskEntity } from "./Task.entity";
import { BaseAttributes } from "./attributes/BaseAttributes";

@Entity("users")
export class UserEntity extends BaseAttributes {
  @Column()
  email: string;

  @Column()
  userName: string;

  @Column("text")
  password: string;

  @Column({ name: "refresh_token", type: "text", nullable: true })
  refreshToken: string | null;

  @Column({ name: "public_key", type: "text", nullable: true })
  publicKey: string | null;

  @Column({ name: "login_at", type: "varchar", nullable: true })
  loginAt: string | null;

  /* Project */
  @OneToMany(type => ProjectUserEntity, projectRole => projectRole.user)
  projectRoles: ProjectUserEntity[];

  /* Task */
  @OneToMany(type => TaskEntity, task => task.author)
  tasksCreated: TaskEntity;

  @OneToMany(type => TaskEntity, task => task.assignee)
  tasksAssigned: TaskEntity;

  /* Notification */
  @OneToMany(type => NotificationEntity, notification => notification.receiver)
  notifications: NotificationEntity[];

  @OneToMany(type => MessageEntity, message => message.receiver)
  messages: MessageEntity[];

  static getPublicDataById(id: string) {
    return this.createQueryBuilder("user")
      .select(["user.id", "user.userName", "user.email"])
      .where("user.id = :id", { id })
      .getOne();
  }
}
