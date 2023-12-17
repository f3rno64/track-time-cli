import DB from '../../db'

export interface SheetCommandArgs {
  db: DB
  delete?: boolean
  name?: string
}
