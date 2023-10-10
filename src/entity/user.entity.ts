import { json } from "express"
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm"
import { Note } from "./note.entity"

@Entity("user")
export class User {
  @PrimaryGeneratedColumn()
  userID: number

  @Column()
  email: string

  @Column()
  userName: string

  @Column()
  password: string

  @Column()
  refreshToken: string

  @Column()
  publicKey: string

  @OneToMany(() => Note, (note) => note.user)
  notes: Note[]
}
