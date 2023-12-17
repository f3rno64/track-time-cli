import DB from '../../db'

export interface SheetsCommandArgs {
  db: DB
  humanize?: boolean
  since?: string
  today?: boolean
}
