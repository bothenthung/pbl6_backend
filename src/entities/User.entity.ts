import { Column, Entity, ManyToMany, OneToMany } from "typeorm";
import { BaseAttributes } from "./attributes/BaseAttributes";
import { ProjectEntity } from "./Project.entity";
import { TaskEntity } from "./Task.entity";
import { NotificationEntity } from "./Notification.entity";

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
  @ManyToMany(type => ProjectEntity, project => project.users)
  projects: ProjectEntity[];

  @OneToMany(type => UserEntity, user => user.roles)
  roles: UserEntity[];

  /* Task */
  @OneToMany(type => TaskEntity, task => task.author)
  tasksCreated: TaskEntity;

  @OneToMany(type => TaskEntity, task => task.assignee)
  tasksAssigned: TaskEntity;

  /* Notification */
  @OneToMany(type => NotificationEntity, notification => notification.receiver)
  notifications: NotificationEntity[];

  static getPublicDataById(id: string) {
    return this.createQueryBuilder("user")
      .select(["user.id", "user.userName", "user.email"])
      .where("user.id = :id", { id })
      .getOne();
  }
}