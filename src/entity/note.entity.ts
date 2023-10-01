import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity("note")
export class Note {
  @PrimaryGeneratedColumn()
  noteID?: number

  @Column()
  title?: string

  @Column()
  content?: string

  @Column()
  created_at?: string
}
