import { PrimaryGeneratedColumn } from 'typeorm'
import { param, ValidationChain } from 'express-validator'

export type PK_Entity = string

export class DBEntity {

  @PrimaryGeneratedColumn('increment')
  id: PK_Entity

}

export const IdValidator: ValidationChain = param('id')
  .trim()
  .isInt()
  .withMessage("The #id needs to be in #int format.")