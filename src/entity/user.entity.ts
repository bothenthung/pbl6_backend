import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { MessageEntity } from "./message.entity"
import { Task } from "./task.entity"

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

  @OneToMany(() => MessageEntity , (message) => message.user)
  messages: MessageEntity[]  
}
