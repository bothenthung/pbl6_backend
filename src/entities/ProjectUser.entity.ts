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
import { EProjectInvitationStatus, EProjectRole } from "../enums/entity-enums";
import { ProjectEntity } from "./Project.entity";

@Entity("projects_users")
export class ProjectUserEntity extends BaseAttributes {
  @Column({ name: "project_id", type: "uuid", nullable: false })
  projectId: string;

  @Column({ name: "user_id", type: "uuid", nullable: false })
  userId: string;

  @Column({ type: "enum", enum: EProjectRole, default: EProjectRole.GUEST })
  role: EProjectRole;

  @Column({ type: "enum", enum: EProjectRole, default: EProjectRole.USER })
  roleInvited: EProjectRole;

  @Column({ type: "enum", enum: EProjectInvitationStatus, default: EProjectInvitationStatus.WAITING })
  status: EProjectInvitationStatus;

  @ManyToOne(type => ProjectEntity, project => project.roles)
  @JoinColumn({ name: "project_id" })
  project: ProjectEntity;

  @ManyToOne(type => UserEntity, user => user.projectRoles)
  @JoinColumn({ name: "user_id" })
  user: UserEntity;
}
