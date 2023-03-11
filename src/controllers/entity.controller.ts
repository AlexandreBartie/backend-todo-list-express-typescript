import { Request, Response } from 'express'
import {
  FindOneOptions,
  FindOptionsOrder,
  ObjectLiteral,
  Repository,
} from 'typeorm'
import { instanceToPlain } from 'class-transformer'
import { DBSchema } from '../database/databaseSchema'
import { validationResult } from 'express-validator'
// import { AppDataSource } from '../../database'
// import { TaskDTO } from '../schema/tasks.schema'

class BaseController extends DBSchema {
  protected checkValidData(req: Request, res: Response): boolean {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      res.json({ error: errors.array() }).status(400)
      return false
    }
    return true
  }

  // protected getItem(res: Response, item: unknown): Response {
  //   if (item) return this.setItem(res, item, 200)
  //   else return this.setIdNotFound(res, req.body.id)
  // }

  // protected newItem(item: unknown) {
  //   this.setItem(item, 201)
  // }

  // protected saveItem(item: unknown) {
  //   this.setItem(item, 201)
  // }

  // private setIdNotFound(id: string) {
  //   this.res.json({ error: `This id #${id} not exist!` }).status(404)
  // }
}

export class EntityController<T extends ObjectLiteral> extends BaseController {
  public async get(
    req: Request,
    res: Response,
    repo: Repository<T>
  ): Promise<Response> {
    //if (this.checkValidData(req, res)) {
      try {
        const id = req.body.id
        const item = await repo.findOne({ where: { id: id } })
        if (item) return res.json(instanceToPlain(item)).status(200)
        else return res.json({ error: `This id #${id} not exist!` }).status(404)
      } catch (err) {
        return res
          .json({ title: 'Internal Server Error', error: err })
          .status(500)
      }
  //  }

  }

  public whereID(id: string): FindOneOptions<T> {
    return { where: { id: id } } as unknown as FindOneOptions<T>
  }

  public async getAll(
    req: Request,
    res: Response,
    repo: Repository<T>,
    order: FindOptionsOrder<T>
  ): Promise<Response> {
    try {
      const list = await repo.find({ order: order })
      return res.json(instanceToPlain(list)).status(200)
    } catch (err) {
      return res
        .json({ title: 'Internal Server Error', error: err })
        .status(500)
    }
  }

  // public async add(
  //   req: Request,
  //   res: Response,
  //   repo: Repository<T>,
  //   item: T
  // ): Promise<Response> {
  //   if (this.setMethod(req, res, true)) {
  //     try {
  //       this.newItem(await repo.save(item))
  //     } catch (err) {
  //       this.setInternalError(err)
  //     }
  //   }
  //   return res
  // }

  // public async save(
  //   req: Request,
  //   res: Response,
  //   repo: Repository<T>,
  //   data: T
  // ): Promise<Response> {
  //   if (this.setMethod(req, res, true)) {
  //     try {
  //       this.saveItem(await repo.update(this.key, data))
  //     } catch (err) {
  //       this.setInternalError(err)
  //     }
  //   }
  //   return res
  // }
}
