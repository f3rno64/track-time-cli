import DB from '../../db'

export interface YesterdayCommandArgs {
  db: DB
  sheets?: string[]
  all?: boolean
  ago?: boolean
  humanize?: boolean
}
