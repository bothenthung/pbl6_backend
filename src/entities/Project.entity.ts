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

  static getDetailById(userId: string, projectId: string) {
    return this.createQueryBuilder("project")
      .select(["project.id", "project.title", "project.description"])
      .leftJoinAndSelect("project.roles", "roles")
      .leftJoin("project.roles", "projects_users")
      .where("project.id = :projectId", { projectId })
      .andWhere("projects_users.userId = :userId", { userId })
      .getOne();
  }
}
