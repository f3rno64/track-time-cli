import DB from '../../db'

export interface TodayCommandArgs {
  db: DB
  ago?: boolean
  all?: boolean
  sheets?: string[]
  humanize?: boolean
}
