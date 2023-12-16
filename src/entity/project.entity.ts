import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm"
import { User } from "./user.entity"
import { Columns } from "./column.entity"
import { MessageEntity } from "./message.entity"
import { UserProject } from "./userProject.entity"

@Entity("project")
export class Project {
  @PrimaryGeneratedColumn("uuid")
  projectID: string

  @Column({ type: "text", nullable: true })
  title: string

  @Column({ type: "text", nullable: true })
  description: string

  @CreateDateColumn({ type: "timestamp" })
  created_at: Date

  @ManyToMany(() => User, { eager: true })
  @JoinTable()
  users: User[]

  @OneToMany(() => Columns, (column) => column.project)
  columns: Columns[]

  @OneToMany(() => UserProject , (userProject) => userProject.user)
  userProjects: UserProject[]  

  @OneToMany(() => MessageEntity, message => message.project)
  messages: MessageEntity[];
}
