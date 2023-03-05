import { Request, Response, Router } from 'express'

//
// Router Function
export const tasksRouter: Router = Router()

tasksRouter.get('/tasks', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server v#0.0.4')
  })