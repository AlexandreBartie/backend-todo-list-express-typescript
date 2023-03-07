import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { Priority } from '../enums/Priority'
import { Status } from '../enums/Status'

import { param, body, ValidationChain } from 'express-validator'

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

const taskIdValidator: ValidationChain = param('id')
  .trim()
  .isInt()
  .withMessage('The task id needs to be in int format')

const taskTitleValidator: ValidationChain = body('title')
  .not()
  .isEmpty()
  .withMessage('The task title is mandatory')
  .trim()
  .isString()
  .withMessage('The task title needs to be in text format')

const taskDateValidator: ValidationChain = body('date')
  .not()
  .isEmpty()
  .withMessage('The task date is mandatory')
  .isDate({ format: 'yyyy-mm-dd' })
  .withMessage('The task date needs to be a valid date format')

const taskDescriptionValidator: ValidationChain = body('description')
  .trim()
  .isString()
  .withMessage('The task title needs to be in text format')

const taskPriorityValidator: ValidationChain = body('priority')
  .trim()
  .isIn([Priority.normal, Priority.high, Priority.low])
  .withMessage('The task priority needs to be in this list')

const taskStatusValidator: ValidationChain = body('status')
  .trim()
  .isIn([Status.todo, Status.doing, Status.done])
  .withMessage('The task status needs to be in this list')

export const taskGetValidator: ValidationChain[] = [taskIdValidator]

export const taskAddValidator: ValidationChain[] = [
  taskTitleValidator,
  taskDescriptionValidator,
  taskDateValidator,
  taskPriorityValidator,
  taskStatusValidator,
]

export const taskSaveValidator: ValidationChain[] = [
  taskIdValidator,
  taskStatusValidator,
]
