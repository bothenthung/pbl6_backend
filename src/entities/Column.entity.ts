import {
  Column,
  Entity,
  ManyToOne,
  OneToMany
} from "typeorm";
import { BaseAttributes } from "./attributes/BaseAttributes";
import { ProjectEntity } from "./Project.entity";
import { TaskEntity } from "./Task.entity";

@Entity("columns")
export class ColumnEntity extends BaseAttributes {
  @Column({ type: "text", nullable: false })
  title: string;

  @Column({ type: "tinyint" })
  index: number;

  @Column({ name: "project_id", type: "uuid", nullable: false })
  projectId: string;

  @ManyToOne(type => ProjectEntity, project => project.columns)
  project: ProjectEntity;

  @OneToMany(type => TaskEntity, task => task.column)
  tasks: TaskEntity[];
}
