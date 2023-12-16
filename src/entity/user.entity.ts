import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { MessageEntity } from "./message.entity"
import { Task } from "./task.entity"
import { UserProject } from "./userProject.entity"

@Entity("user")
export class User {
  @PrimaryGeneratedColumn("uuid")
  userID: string

  @Column()
  email: string

  @Column()
  userName: string

  @Column("text")
  password: string

  @Column({ type: "text", nullable: true })
  refreshToken: string | null

  @Column({ type: "text", nullable: true })
  publicKey: string | null

  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[]

  @OneToMany(() => MessageEntity , (message) => message.userSend)
  sendMessages: MessageEntity[]  
  
  @OneToMany(() => MessageEntity , (message) => message.userReceive)
  receiveMessages: MessageEntity[]  

  @OneToMany(() => UserProject , (userProject) => userProject.user)
  userProjects: UserProject[]  
}
