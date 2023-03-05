import { Request, Response, Router } from 'express'

//
// Router Function
export const taskRouter: Router = Router()

taskRouter.get('/task', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server v#0.0.3')
  })