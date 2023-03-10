import { describe, expect, test } from '@jest/globals'
import { TaskDTO } from '../src/schema/tasks.schema'

describe('Database', () => {
  test('TaskDB', async () => {
  
    const task = new TaskDTO() // .get('11')

    if (await task.getAll()) {
      console.log(task.title)

      expect(task.title).toBe('oi')
    } else
    {
      console.log(`Error DataBase ... ${task.getError()?.details}`)
    } expect(false).toBe(true)
  })
})
