import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { Priority } from '../enums/Priority'
import { Status } from '../enums/Status'

import { body, ValidationChain } from 'express-validator'

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
    type: 'date',
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

export const taskCreateValidator: ValidationChain[] = [
  body('title')
    .not()
    .isEmpty()
    .withMessage('The task title is mandatory')
    .trim()
    .isString()
    .withMessage('The task title needs to be in text format'),

  body('date')
    .not()
    .isEmpty()
    .withMessage('The task date is mandatory')
    .isDate({ format: 'yyyy-mm-dd' })
    .withMessage('The task date needs to be a valid date format'),

  body('description')
    .trim()
    .isString()
    .withMessage('The task title needs to be in text format'),

  body('priority')
    .trim()
    .isIn([Priority.normal, Priority.high, Priority.low])
    .withMessage('The task priority needs to be in this list'),

  body('status')
    .trim()
    .isIn([Status.todo, Status.doing, Status.done])
    .withMessage('The task status needs to be in this list'),
]

export const taskUpdateValidator: ValidationChain[] = [
  body('id')
  .not()
  .isEmpty()
  .withMessage('The task id is mandatory')
  .trim()
  .isInt()
  .withMessage('The task title needs to be in int format'),

  body('status')
  .trim()
  .isIn([Status.todo, Status.doing, Status.done])
  .withMessage('The task status needs to be in this list'),
]
