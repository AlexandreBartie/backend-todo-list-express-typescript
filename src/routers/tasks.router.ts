import { Router } from 'express'
import { taskController } from '../controllers/tasks.controller'
import { taskDataCheck, taskGetCheck } from '../schema/tasks.schema'

export const tasksRouter: Router = Router()

console.log('adding routers ...')

tasksRouter.post('/task', taskDataCheck, taskController.add)

tasksRouter.get('/task/:id', taskGetCheck, taskController.get)

tasksRouter.put('/task/:id', taskDataCheck, taskController.save)

tasksRouter.get('/tasks', taskController.getAll)
