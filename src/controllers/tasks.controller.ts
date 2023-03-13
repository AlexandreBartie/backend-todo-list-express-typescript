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
    item.setData(req.body)

    // item.title = req.body.title
    // item.description = req.body.description
    // item.date = req.body.date
    // item.priority = req.body.priority
    // item.status = req.body.status
    return await super.add(req, res, AppDataSource.getRepository(TaskDTO), item)
  }

  public async save(req: Request, res: Response): Promise<Response> {
      return super.save(req, res, AppDataSource.getRepository(TaskDTO))
  }

  // public async saveStatus(req: Request, res: Response): Promise<Response> {
  //   //if (await this.find(req, res)) {
  //     // const update = plainToInstance(TaskDTO, )
  //     return super.save(req, res, AppDataSource.getRepository(TaskDTO)) //, { status: req.body.status })
  //   // } else return res
  // }

  public async getAll(req: Request, res: Response): Promise<Response> {
    return super.getAll(req, res, AppDataSource.getRepository(TaskDTO), {
      date: 'ASC',
      id: 'ASC',
    })
  }
}

export const taskController = new TasksController()
