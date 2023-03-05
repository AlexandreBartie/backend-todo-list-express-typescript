import { instanceToPlain } from 'class-transformer'
import { Repository } from 'typeorm'

import { AppDataSource } from '../../data-source'
import {Task } from '../entity/tasks.entity'

export class TasksController {
  private taskRepository : Repository<Task>
  
  constructor() {
    this.taskRepository = AppDataSource.getRepository(Task)
  }

  public async getAll(): Promise<Task[]> {
    let all: Task[] = []

    try {
      all = await this.taskRepository.find({
        order: { title: 'ASC' },
      })
      // Convert the tasks to array of objects
      all = instanceToPlain(all) as Task[]
    } catch (err) {
      console.log(`BadNewssss: ${err}`)
    }
    return all
  }
}
