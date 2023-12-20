import DB from './db'

export interface TimeSheetEntry {
  id: number
  start: Date
  end: Date | null
  description: string
}

export interface TimeSheet {
  name: string
  entries: TimeSheetEntry[]
  activeEntryID: number | null
}

export interface TimeTrackerDB {
  sheets: TimeSheet[]
  activeSheetName: string | null
}

export interface YArgsDynamicOptionArgs {
  db: DB
}

export type YArgsOptionDefinition = [string, Record<string, string | string[]>]
export type YArgsDynamicOptionDefinition = (
  args: YArgsDynamicOptionArgs
) => Promise<YArgsOptionDefinition>

export interface BreakdownResult {
  date: Date
  duration: number
  sheets: TimeSheet[]
  entries: TimeSheetEntry[]
}

export type BreakdownResults = Record<string, BreakdownResult>
