import { DBSchema } from './databaseSchema'

export type DBRecord = Record<string, unknown>
export type DBErrors = string[]

export class DBEntity extends DBSchema {
  //
  // Check if all fields are present in 'data' parameter
  //
  check<T extends DBRecord>(data: T): DBErrors {
    const errors: DBErrors = []
    Object.keys(this).forEach((key) => {
      if (!(key in data))
        errors.push(`${key}: field not found!`)
    })

    Object.keys(data).forEach((key) => {
      if (!(key in this))
        errors.push(`${key}: field not exist!`)
    })

    return errors
  }

  //
  // Set all values for each field present in 'data' parameter
  //
  setData<T extends DBRecord>(data: T): unknown {
    Object.keys(data).forEach((key) => {
      if (key in this && typeof data[key] !== 'undefined') {
        this[key] = data[key]
      }
    })
    return this
  }
}
