import {
  Column,
  Entity
} from "typeorm"
import { BaseAttributes } from "./attributes/BaseAttributes";

@Entity("columns")
export class ColumnEntity extends BaseAttributes {
  @Column({ type: "text", nullable: false })
  title: string

  @Column({ type: "tinyint"})
  index: number
}
