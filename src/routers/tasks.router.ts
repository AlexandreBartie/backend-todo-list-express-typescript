import { Router } from 'express'
import { taskController } from '../controllers/tasks.controller'
import { taskAddValidator, taskGetValidator, taskSaveStatusValidator, taskSaveTitleValidator } from '../schema/tasks.schema'

export const tasksRouter: Router = Router()

console.log('adding routers ...')

tasksRouter.post('/task', taskAddValidator, taskController.add)

tasksRouter.get('/task/:id', taskGetValidator, taskController.get)

tasksRouter.put('/task/title/:id', taskSaveTitleValidator, taskController.saveTitle)
tasksRouter.put('/task/status/:id', taskSaveStatusValidator, taskController.saveStatus)

tasksRouter.get('/tasks', taskController.getAll)
