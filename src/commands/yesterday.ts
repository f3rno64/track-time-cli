import * as U from '../utils'
import * as P from '../print'
import { type TimeSheetEntry, type TimeTrackerDB } from '../types'

const COMMAND_CONFIG = {
  command: 'yesterday',
  describe: 'Display a summary of activity for yesterday'
}

interface YesterdayCommandArguments {
  db: TimeTrackerDB
}

const isEntryForYesterday = (entry: TimeSheetEntry): boolean => {
  const { start, end } = entry
  const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000)
  const startOfYesterday = U.getStartDate(yesterday)
  const endOfYesterday = U.getEndDate(yesterday)

  return (
    +start >= +startOfYesterday && (end === null || +end <= +endOfYesterday)
  )
}

const handler = (args: YesterdayCommandArguments) => {
  const { db } = args
  const { sheets } = db
  const sheetsWithEntriesForYesterday = sheets
    .map(({ entries, ...otherSheetData }) => ({
      entries: entries.filter(isEntryForYesterday),
      ...otherSheetData
    }))
    .filter(({ entries }) => entries.length > 0)

  if (sheetsWithEntriesForYesterday.length === 0) {
    throw new Error('No entries for yesterday')
  }

  P.printSummary(sheetsWithEntriesForYesterday, true)
  P.printSheets(sheetsWithEntriesForYesterday, true)
}

export default {
  ...COMMAND_CONFIG,
  handler
}
