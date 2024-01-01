import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
} from "typeorm"
import { BaseAttributes } from "./attributes/BaseAttributes"
import { UserEntity } from "./User.entity"
import { ProjectUserEntity } from "./ProjectUser.entity";
import { ColumnEntity } from "./Column.entity";

@Entity("projects")
export class ProjectEntity extends BaseAttributes {
  @Column({ type: "text", nullable: false })
  title: string

  @Column({ type: "text", nullable: true })
  description?: string

  @ManyToMany(type => UserEntity, user => user.projects)
  users: UserEntity[]

  @OneToMany(type => ProjectUserEntity, projectUser => projectUser.project)
  roles: ProjectUserEntity[]

  @OneToMany(type => ColumnEntity, column => column.project)
  columns: ColumnEntity[]
}
