import DB from '../../db'

export interface WeekCommandArgs {
  db: DB
  total?: boolean
  sheets?: string[]
  ago?: boolean
  humanize?: boolean
}

export interface WeekdayResult {
  duration: number
  entries: number
}

export type SheetResults = Record<string, WeekdayResult>
export type WeekdayResults = Record<string, SheetResults>
export type TotalResults = Record<string, WeekdayResult>
