import DB from '../../db'

export interface EditCommandArgs {
  db: DB
  sheet?: string
  name?: string
  entry?: string
  description?: string
  delete?: boolean
  start?: string
  end?: string
}
