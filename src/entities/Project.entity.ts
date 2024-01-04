import {
  Column,
  Entity,
  OneToMany,
} from "typeorm";
import { BaseAttributes } from "./attributes/BaseAttributes";
import { ProjectUserEntity } from "./ProjectUser.entity";
import { ColumnEntity } from "./Column.entity";

@Entity("projects")
export class ProjectEntity extends BaseAttributes {
  @Column({ type: "text", nullable: false })
  title: string;

  @Column({ type: "text", nullable: true })
  description?: string;

  @OneToMany(type => ProjectUserEntity, projectUser => projectUser.project)
  roles: ProjectUserEntity[];

  @OneToMany(type => ColumnEntity, column => column.project)
  columns: ColumnEntity[];

  role: ProjectUserEntity;

  static getDetailById(userId: string, projectId: string) {
    return this.createQueryBuilder("project")
      .leftJoinAndSelect("project.roles", "roles")
      .leftJoinAndSelect("roles.user", "user")
      .leftJoin("project.roles", "projects_users")
      .leftJoinAndMapOne("project.role", "project.roles", "role", "role.userId = :userId", { userId })
      .where("project.id = :projectId", { projectId })
      .andWhere("projects_users.userId = :userId", { userId })
      .select(["project.id", "project.title", "project.description", "role.role"])
      .getOne();
  }
}
