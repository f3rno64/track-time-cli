import DB from '../db'
import * as U from '../utils'
import * as P from '../print'
import { type TimeSheetEntry } from '../types'

const COMMAND_CONFIG = {
  command: 'yesterday [sheets..]',
  describe: 'Display a summary of activity for yesterday',
  aliases: ['y']
}

interface YesterdayCommandArguments {
  db: DB
  sheets?: string[]
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
  const { sheets: inputSheets, db } = args
  const sheets =
    typeof inputSheets === 'undefined'
      ? db.getAllSheets()
      : inputSheets.map((name: string) => db.getSheet(name))

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
