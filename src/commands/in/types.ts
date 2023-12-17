import DB from '../../db'

export interface InCommandArgs {
  db: DB
  description: string[]
  sheet?: string
  at?: string
}
