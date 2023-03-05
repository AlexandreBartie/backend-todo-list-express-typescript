import { AppDataSource } from '../data-source'
import { Task } from '../entity/tasks.entity'

export class TasksController {
  constructor(private taskRepository = AppDataSource.getRepository(Task)) {}

  public async getAll(): Promise<Task[]> {
    let all!: Task[]

    try {
      all = await this.taskRepository.find({
        order: { date: 'ASC' },
      })
    } catch (err) {
      console.log('err')
    }
    return all
  }
}
