import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm"
import { User } from "./user.entity"

@Entity("note")
export class Note {
  @PrimaryGeneratedColumn()
  noteID: number

  @Column()
  title: string

  @Column()
  content: string

  @Column()
  created_at: string

  @ManyToOne(() => User, (user) => user.notes)
  user: User
}
