import { Request, Response } from 'express'
import { FindOptionsOrder, ObjectLiteral, Repository } from 'typeorm'
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

  public setList(res: Response, list: unknown): Response {
    return this.setItem(res, list, 200)
  }

  public setItem(res: Response, item: unknown, status: number): Response {
    return res.json(instanceToPlain(item)).status(status)
  }
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
  // public async get(
  //   req: Request,
  //   res: Response,
  //   repo: Repository<T>
  // ): Promise<Response> {
  //   if (this.setMethod(req, res, true)) {
  //     try {
  //       this.getItem(await repo.findOne(this.whereID()))
  //     } catch (err) {
  //       this.setInternalError(err)
  //     }
  //   }
  //   return res
  // }
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
      return res.json(this.setInternalError(err)).status(500)
    }
  }

  private setInternalError(err: unknown): object {
    return { title: 'Internal Server Error', error: err }
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

// public whereID(): FindOneOptions<T> {
//   return { where: { id: this.key } } as unknown as FindOneOptions<T>
// }
