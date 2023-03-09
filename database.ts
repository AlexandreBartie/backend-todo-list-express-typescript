import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { TaskDB } from './src/schema/tasks.schema'

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'user',
  password: 'password',
  database: 'Todo',
  synchronize: true,
  logging: false,
  entities: [TaskDB],
  migrations: [],
  subscribers: [],
})
