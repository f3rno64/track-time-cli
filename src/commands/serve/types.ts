import DB from '../../db'

export interface ServeCommandArgs {
  db: DB
  port?: number
  hostname?: string
}
