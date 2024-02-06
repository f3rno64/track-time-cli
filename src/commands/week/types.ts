import { type Argv } from 'yargs'

import DB from '../../db'

export interface WeekCommandArgs {
  db: DB
  yargs: Argv
  ago?: boolean
  help?: boolean
  total?: boolean
  sheets?: string[]
  humanize?: boolean
}

export interface WeekdayResult {
  entries: number
  duration: number
}

export type SheetResults = Record<string, WeekdayResult>
export type TotalResults = Record<string, WeekdayResult>
export type WeekdayResults = Record<string, SheetResults>
