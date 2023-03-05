import { Request, Response, Router } from 'express'
import { TasksController } from '../controllers/tasks.controller'

//
// Router Function
export const tasksRouter: Router = Router()

tasksRouter.get('/tasks', async (req: Request, res: Response) => {
  const tasks = new TasksController()
  res.json(await tasks.getAll()).status(200)
  })