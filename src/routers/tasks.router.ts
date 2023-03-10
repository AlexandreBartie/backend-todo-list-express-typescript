import { Router } from 'express'
import { taskController } from '../controllers/tasks.controller'

//
// Router Function
export const tasksRouter: Router = Router()

console.log('adding routers ...')

// tasksRouter.post('/task', taskAddValidator, taskController.add)

// tasksRouter.get('/task/:id', taskGetValidator, taskController.get)

// tasksRouter.put('/task/:id', taskSaveValidator, taskController.save)

// tasksRouter.put('/task/:id', taskSaveValidator, taskController.save)

tasksRouter.get('/tasks', taskController.getAll)


