import { json } from "express"
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

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
}
