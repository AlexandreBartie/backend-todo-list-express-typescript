import { ObjectLiteral, PrimaryGeneratedColumn } from 'typeorm'
import { param, ValidationChain } from 'express-validator'

export type DB_PK = string

export class DBSchema implements ObjectLiteral {

  [key: string]: unknown

  @PrimaryGeneratedColumn('increment')
  id: DB_PK
}

export const IdCheck: ValidationChain = param('id')
  .trim()
  .isInt()
  .withMessage('The #id needs to be in #int format.')
  
