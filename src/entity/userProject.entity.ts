import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Project } from "./project.entity"
import { User } from "./user.entity"

@Entity("user_project")
export class UserProject {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column({ type: "text", nullable: false })
  userID: string

  @Column({ type: "text", nullable: false })
  projectID: string
  
  @ManyToOne(() => User , (user) => user.userProjects)
  @JoinColumn({ name: "userID" , referencedColumnName: 'userID'})
  user: User

  @ManyToOne(() => Project , (project) => project.userProjects)
  @JoinColumn({ name: "projectID" , referencedColumnName: 'projectID'})
  project: Project
}
