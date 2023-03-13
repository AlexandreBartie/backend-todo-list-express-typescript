import { Entity, Column } from 'typeorm'
import { body, ValidationChain } from 'express-validator'

import { Priority } from '../enums/Priority'
import { Status } from '../enums/Status'
import { DBEntity } from '../database/databaseEntity'
import { IdCheck } from '../database/databaseSchema'

@Entity('Task')
export class TaskDTO extends DBEntity {
  constructor() {
    super()
    this.title = ''
    this.description = ''
    this.date = ''
    this.priority = Priority.normal
    this.status = Status.todo
  }

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

//
// Check if attribute exist
//
// const taskTitleExist: ValidationChain = body('title').exists()

// const taskDateExist: ValidationChain = body('date').exists()

// const taskDescriptionExist: ValidationChain = body('description').exists()

// const taskPriorityExist: ValidationChain = body('priority').exists()

// const taskStatusExist: ValidationChain = body('status').exists()

const taskTitleCheck: ValidationChain = body('title')
  // .if(taskTitleExist)
  .not()
  .isEmpty()
  .withMessage('The task title is mandatory')
  .trim()
  .isString()
  .withMessage('The task title needs to be in text format')

const taskDateCheck: ValidationChain = body('date')
  // .if(taskDateExist)
  .not()
  .isEmpty()
  .withMessage('The task date is mandatory')
  .isDate({ format: 'yyyy-mm-dd' })
  .withMessage('The task date needs to be a valid date format')

const taskDescriptionCheck: ValidationChain = body('description')
  // .if(taskDescriptionExist)
  .trim()
  .isString()
  .withMessage('The task description needs to be in text format')

const taskPriorityCheck: ValidationChain = body('priority')
  // .if(taskPriorityExist)
  .trim()
  .isIn([Priority.normal, Priority.high, Priority.low])
  .withMessage('The task priority needs to be in this list')

const taskStatusCheck: ValidationChain = body('status')
  // .if(taskStatusExist)
  .trim()
  .isIn([Status.todo, Status.doing, Status.done])
  .withMessage('The task status needs to be in this list')

export const taskGetCheck: ValidationChain[] = [IdCheck]

export const taskDataCheck: ValidationChain[] = [
  taskTitleCheck,
  taskDescriptionCheck,
  taskDateCheck,
  taskPriorityCheck,
  taskStatusCheck,
]
