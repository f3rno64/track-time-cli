import DB from '../../db'

export interface BreakdownCommandArgs {
  db: DB
  sheets?: string[]
  humanize?: boolean
  all?: boolean
  since?: string
  ago?: boolean
}
