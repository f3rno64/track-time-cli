import DB from '../../db'
import { type TimeSheet, type TimeSheetEntry } from '../../types'

export interface BreakdownCommandArgs {
  db: DB
  sheets?: string[]
  humanize?: boolean
  all?: boolean
  since?: string
  ago?: boolean
}

export interface BreakdownResult {
  date: Date
  duration: number
  sheets: TimeSheet[]
  entries: TimeSheetEntry[]
}
