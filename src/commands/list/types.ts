import DB from '../../db'

export interface ListCommandArgs {
  db: DB
  sheets?: string[]
  ago?: boolean
  all?: boolean
  since?: string
  today?: boolean
  yesterday?: boolean
  humanize?: boolean
}
