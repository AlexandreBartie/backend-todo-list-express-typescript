import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { Priority } from '../enums/Priority'
import { Status } from '../enums/Status'

@Entity('Task')
export class Task {
  @PrimaryGeneratedColumn('increment')
  id: string

  @Column({
    type: 'varchar',
    length: 255,
  })
  title: string

  @Column({
    type: 'longtext',
  })
  description: string

  @Column({
    type: 'varchar',
    length: 20,
    default: "here",
  })
  matuzo: string

  @Column({
    type: 'varchar',
    length: 30,
    nullable: true,
  })
  norrr: string

  @Column({
    type: 'varchar',
    length: 30,
    default: "nothing",
  })
  reason: string

  @Column({
    type: 'enum',
    enum: Priority,
    default: Priority.normal,
  })
  priority: Priority

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.todo,
  })
  status: Status
}
