import { json } from "express"
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm"
import { Note } from "./note.entity"

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

  @OneToMany(() => Note, (note) => note.user)
  notes: Note[]
}
