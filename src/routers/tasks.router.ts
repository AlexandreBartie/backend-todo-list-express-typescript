import { Router } from 'express'
import { taskController } from '../controllers/tasks.controller'
import {
  taskGetValidator,
  taskAddValidator,
  taskSaveValidator,
} from '../entity/tasks.entity'

//
// Router Function
export const tasksRouter: Router = Router()

tasksRouter.post('/task', taskAddValidator, taskController.add)

tasksRouter.get('/task/:id', taskGetValidator, taskController.get)

tasksRouter.put('/task/:id', taskSaveValidator, taskController.save)

tasksRouter.get('/tasks', taskController.getAll)
