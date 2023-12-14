import * as U from '../utils'
import * as P from '../print'
import { type TimeSheetEntry, type TimeTrackerDB } from '../types'

const COMMAND_CONFIG = {
  command: 'today',
  describe: 'Display a summary of activity for today'
}

interface TodayCommandArguments {
  db: TimeTrackerDB
  ago: boolean
}

const isEntryForToday = (entry: TimeSheetEntry): boolean => {
  const { start, end } = entry
  const startOfToday = U.getStartDate()
  const endOfToday = U.getEndDate()

  return +start >= +startOfToday && (end === null || +end <= +endOfToday)
}

const handler = (args: TodayCommandArguments) => {
  const { db } = args
  const { sheets } = db
  const sheetsWithEntriesForToday = sheets
    .map(({ entries, ...otherSheetData }) => ({
      entries: entries.filter(isEntryForToday),
      ...otherSheetData
    }))
    .filter(({ entries }) => entries.length > 0)

  if (sheetsWithEntriesForToday.length === 0) {
    throw new Error('No entries for today')
  }

  P.printSummary(sheetsWithEntriesForToday, true)
  P.printSheets(sheetsWithEntriesForToday, true)
}

export default {
  ...COMMAND_CONFIG,
  handler
}
