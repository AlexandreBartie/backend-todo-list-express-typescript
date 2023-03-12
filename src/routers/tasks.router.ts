import { Router } from 'express'
import { taskController } from '../controllers/tasks.controller'
import { taskAddValidator, taskGetValidator } from '../schema/tasks.schema'

export const tasksRouter: Router = Router()

console.log('adding routers ...')

tasksRouter.post('/task', taskAddValidator, taskController.add)

tasksRouter.get('/task/:id', taskGetValidator, taskController.get)

// tasksRouter.put('/task/:id', taskSaveValidator, taskController.saveStatus)

tasksRouter.get('/tasks', taskController.getAll)
