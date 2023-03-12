import { Request, Response } from 'express'

import { AppDataSource } from '../database/databaseSettings'
import { DBPersistence } from '../database/databasePersistence'
import { TaskDTO } from '../schema/tasks.schema'

class TasksController extends DBPersistence<TaskDTO> {
  public async get(req: Request, res: Response): Promise<Response> {
    return await super.get(req, res, AppDataSource.getRepository(TaskDTO))
  }

  public async add(req: Request, res: Response): Promise<Response> {
    const item = new TaskDTO()
    item.title = req.body.title
    item.description = req.body.description
    item.date = req.body.date
    item.priority = req.body.priority
    item.status = req.body.status
    return await super.add(req, res, AppDataSource.getRepository(TaskDTO), item)
  }

  // public async saveStatus(req: Request, res: Response): Promise<Response> {
  //   if (await this.find(req, res)) {
  //     const update = plainToInstance(TaskDTO, { status: req.body.status })
  //     return super.save(req, res, AppDataSource.getRepository(TaskDTO), update)
  //   } else return res
  // }

  public async getAll(req: Request, res: Response): Promise<Response> {
    return super.getAll(req, res, AppDataSource.getRepository(TaskDTO), {
      date: 'ASC',
      id: 'ASC',
    })
  }
}

// private async find(req: Request, res: Response): Promise<boolean> {
//   await this.get(req, res)

//   return true
// }

export const taskController = new TasksController()
