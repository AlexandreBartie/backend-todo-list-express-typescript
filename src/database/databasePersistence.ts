import { Request, Response } from 'express'
import { FindOneOptions, FindOptionsOrder, Repository } from 'typeorm'
import { instanceToPlain } from 'class-transformer'
import { validationResult } from 'express-validator'
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity'
import { DBEntity } from './databaseEntity'

export class DBPersistence<T extends DBEntity> {
  protected async get(
    req: Request,
    res: Response,
    repo: Repository<T>
  ): Promise<Response> {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
      try {
        const id = req.params.id
        const condition = { where: { id: id } } as unknown as FindOneOptions<T>
        const item = await repo.findOne(condition)
        if (item) return res.json(instanceToPlain(item)).status(200)
        else return res.json({ error: `This id #${id} not exist!` }).status(404)
      } catch (err) {
        return res
          .json({ title: 'Internal Server Error', error: err })
          .status(500)
      }
    }
    return res.json({ error: errors.array() }).status(400)
  }

  protected async add(
    req: Request,
    res: Response,
    repo: Repository<T>,
    item: T
  ): Promise<Response> {

    const checkErrors = item.check(req.body)
    if (checkErrors.length === 0)
    {
      const errors = validationResult(req)
      if (errors.isEmpty()) {
        try {
          const save = await repo.save(item)
  
          return res.json(instanceToPlain(save)).status(201)
        } catch (err) {
          return res
            .json({ title: 'Internal Server Error', error: err })
            .status(500)
        }
      }
      return res.json({ data: errors.array() }).status(400)
    }
    return res.json({ interface: checkErrors }).status(400)
    }


  protected async save(
    req: Request,
    res: Response,
    repo: Repository<T>
  ): Promise<Response> {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
      try {
        const id = req.params.id
        const condition = { where: { id: id } } as unknown as FindOneOptions<T>
        const item = await repo.findOne(condition)
        if (!item) return res.json({ error: `This id #${id} not exist!` }).status(404)

        const itemChanged = item.setData(req.body) as unknown as QueryDeepPartialEntity<T>

        const update = await repo.update(id, itemChanged)

        return res.json(instanceToPlain(update)).status(201)


      } catch (err) {
        return res
          .json({ title: 'Internal Server Error', error: err })
          .status(500)
      }
    }
    return res.json({ error: errors.array() }).status(400)
  }

  protected async getAll(
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

}


