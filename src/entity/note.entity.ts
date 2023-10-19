import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
  UpdateDateColumn,
} from "typeorm"
import { User } from "./user.entity"

@Entity("note")
export class Note {
  @PrimaryGeneratedColumn()
  noteID: number

  @Column("text")
  title: string

  @Column({ type: "text", nullable: true })
  content: string | null

  @CreateDateColumn({ type: "timestamp" })
  created_at: Date

  @UpdateDateColumn({ type: "timestamp" })
  updated_at: Date

  @ManyToOne(() => User, (user) => user.notes)
  @JoinColumn({ name: "userID" })
  user: User
}
