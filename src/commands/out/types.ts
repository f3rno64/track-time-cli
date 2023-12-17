import DB from '../../db'

export interface OutCommandArgs {
  db: DB
  at?: string[]
}
