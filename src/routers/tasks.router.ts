import { Router } from 'express'
import { taskController } from '../controllers/tasks.controller'
import { taskCreateValidator, taskUpdateValidator } from '../entity/tasks.entity'

//
// Router Function
export const tasksRouter: Router = Router()

tasksRouter.get('/tasks', taskController.getAll)

tasksRouter.post(
  '/tasks',
  taskCreateValidator,
  taskController.create
)

tasksRouter.put(
  '/tasks',
  taskUpdateValidator,
  taskController.update
)

