import { Router } from 'express'
import { taskController } from '../controllers/tasks.controller'
import { taskGetValidator } from '../schema/tasks.schema'

//
// Router Function
export const tasksRouter: Router = Router()

// tasksRouter.post('/task', taskAddValidator, taskController.add)

tasksRouter.get('/task/:id', taskGetValidator, taskController.get)

// tasksRouter.put('/task/:id', taskSaveValidator, taskController.save)

// tasksRouter.put('/task/:id', taskSaveValidator, taskController.save)

// tasksRouter.get('/tasks', taskController.getAll)
