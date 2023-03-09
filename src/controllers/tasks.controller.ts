import { DBRestAPI } from '../database/databaseRestAPI'

class TasksController extends DBRestAPI {
  // public async get(req: Request, res: Response): Promise<Response> {
  //   const errors = validationResult(req)
  //   if (!errors.isEmpty()) {
  //     return res.status(400).json({ error: errors.array() })
  //   }
  //   const { id } = req.params
  //   let task: Task | null
  //   try {
  //     task = await AppDataSource.getRepository(Task).findOne({
  //       where: { id: id },
  //     })
  //   } catch (err) {
  //     return res
  //       .json({ title: 'Internal Server Error', error: err })
  //       .status(500)
  //   }
  //   if (task) return res.json(instanceToPlain(task)).status(200)
  //   else
  //     return res
  //       .status(404)
  //       .json({ error: `This id task does not exist! -id: ${req.body.id}` })
  // }
  // Method for the post route
  // public async add(req: Request, res: Response): Promise<Response> {
  //   const errors = validationResult(req)
  //   if (!errors.isEmpty()) {
  //     return res.status(400).json({ error: errors.array() })
  //   }
  //   const newItem = new Task()
  //   newItem.title = req.body.title
  //   newItem.description = req.body.description
  //   newItem.date = req.body.date
  //   newItem.priority = req.body.priority
  //   newItem.status = req.body.status
  //   try {
  //     const save = await AppDataSource.getRepository(Task).save(newItem)
  //     return res.json(instanceToPlain(save)).status(201)
  //   } catch (err) {
  //     return res
  //       .json({ title: 'Internal Server Error', error: err })
  //       .status(500)
  //   }
  // }
  // // Method for the post route
  // public async save(req: Request, res: Response): Promise<Response> {
  //   const errors = validationResult(req)
  //   if (!errors.isEmpty()) {
  //     return res.status(400).json({ error: errors.array() })
  //   }
  //   const { id } = req.params
  //   // try to find if the task exist
  //   let task: Task | null
  //   try {
  //     task = await AppDataSource.getRepository(Task).findOne({
  //       where: { id: id },
  //     })
  //   } catch (err) {
  //     return res
  //       .json({ title: 'Internal Server Error', error: err })
  //       .status(500)
  //   }
  //   if (!task)
  //     return res
  //       .status(404)
  //       .json({ error: `This id task does not exist! -id: ${id}` })
  //   try {
  //     const update = await AppDataSource.getRepository(Task).update(
  //       id,
  //       plainToInstance(Task, { status: req.body.status })
  //     )
  //     return res.json(instanceToPlain(update)).status(201)
  //   } catch (err) {
  //     return res
  //       .json({ title: 'Internal Server Error', error: err })
  //       .status(500)
  //   }
  // }
  // public async getAll(req: Request, res: Response): Promise<Response> {
  //   try {
  //     const all = await AppDataSource.getRepository(Task).find({
  //       order: { date: 'ASC', id: 'ASC' },
  //     })
  //     return res.json(instanceToPlain(all)).status(200)
  //   } catch (err) {
  //     return res
  //       .json({ title: 'Internal Server Error', error: err })
  //       .status(500)
  //   }
  // }
}

export const taskController = new TasksController()
