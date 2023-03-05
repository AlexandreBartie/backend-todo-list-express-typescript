import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { Priority } from '../enums/Priority'
import { Status } from '../enums/Status'

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid', { })
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
    type: 'string',
  })
  date: string

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
