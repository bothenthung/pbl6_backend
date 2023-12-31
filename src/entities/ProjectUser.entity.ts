import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
} from "typeorm";
import { BaseAttributes } from "./attributes/BaseAttributes";
import { UserEntity } from "./User.entity";
import { EProjectRole } from "../enums/entity-enums";
import { ProjectEntity } from "./Project.entity";

@Entity("projects_users")
export class ProjectUserEntity extends BaseAttributes {
  @Column({ name: "project_id", type: "uuid", nullable: false })
  projectId: string;

  @Column({ name: "owner_id", type: "uuid", nullable: false })
  ownerId: string;

  @Column({ type: "enum", enum: EProjectRole, default: EProjectRole.GUEST })
  role: EProjectRole;

  @ManyToOne(type => ProjectEntity, project => project.roles)
  project: ProjectEntity

  @ManyToOne(type => UserEntity, user => user.roles)
  user: UserEntity
}
