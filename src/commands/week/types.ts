import { type Argv } from 'yargs'

import DB from '../../db'

export interface WeekCommandArgs {
  db: DB
  yargs: Argv
  total?: boolean
  sheets?: string[]
  ago?: boolean
  humanize?: boolean
  help?: boolean
}

export interface WeekdayResult {
  duration: number
  entries: number
}

export type SheetResults = Record<string, WeekdayResult>
export type WeekdayResults = Record<string, SheetResults>
export type TotalResults = Record<string, WeekdayResult>
