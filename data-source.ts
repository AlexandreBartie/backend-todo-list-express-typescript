import 'reflect-metadata'
import { DataSource } from 'typeorm'
// import { SnakeCaseNamingStrategy } from 'typeorm-naming-strategies';
import { Task } from './src/entity/tasks.entity'

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'user',
  password: 'password',
  database: 'Todo',
  // namingStrategy: new SnakeCaseNamingStrategy(),
  synchronize: true,
  logging: false,
  entities: [Task],
  migrations: [],
  subscribers: [],
})

