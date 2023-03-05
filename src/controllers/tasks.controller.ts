import { instanceToPlain } from 'class-transformer'

import { AppDataSource } from '../../data-source'
import { Task } from '../entity/tasks.entity'

export class TasksController {
  constructor(private taskRepository = AppDataSource.getRepository(Task)) {}

  public async getAll(): Promise<Task[]> {
    let all!: Task[]

    try {
      all = await this.taskRepository.find({
        order: { date: 'ASC' },
      })
      // Convert the tasks to array of objects
      all = instanceToPlain(all) as Task[]
    } catch (err) {
      console.log('err')
    }
    return all
  }
}
