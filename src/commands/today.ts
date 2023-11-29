import * as C from '../color'
import * as U from '../utils'
import * as P from '../print'
import {
  type TimeSheetEntry,
  type TimeSheet,
  type TimeTrackerDB
} from '../types'

const COMMAND_CONFIG = {
  command: 'today',
  describe: 'Display a summary of activity for today'
}

interface TodayCommandArguments {
  db: TimeTrackerDB
}

const getDateForStartOfToday = (): Date => {
  const d = new Date()

  d.setHours(0)
  d.setMinutes(0)
  d.setSeconds(0)
  d.setMilliseconds(0)

  return d
}

const getDateForEndOfToday = (): Date => {
  const d = new Date()

  d.setHours(23)
  d.setMinutes(59)
  d.setSeconds(59)
  d.setMilliseconds(999)

  return d
}

const isEntryForToday = (entry: TimeSheetEntry): boolean => {
  const { start, end } = entry
  const startOfToday = getDateForStartOfToday()
  const endOfToday = getDateForEndOfToday()

  return +start >= +startOfToday && (end === null || +end <= +endOfToday)
}

const handler = (args: TodayCommandArguments) => {
  const { db } = args
  const { activeSheetName, sheets } = db
  const sheetsWithEntriesForToday = sheets
    .map(({ entries, ...otherSheetData }) => ({
      entries: entries.filter(isEntryForToday),
      ...otherSheetData
    }))
    .filter(({ entries }) => entries.length > 0)

  if (sheetsWithEntriesForToday.length === 0) {
    console.log(C.clText('No entries for today'))
    return
  }

  sheetsWithEntriesForToday.forEach((sheet: TimeSheet, i: number) => {
    P.printSheet(sheet, sheet.name === activeSheetName)

    if (i < sheetsWithEntriesForToday.length - 1) {
      console.log('')
    }
  })

  console.log('')
  P.printSummary(sheetsWithEntriesForToday)
}

export default {
  ...COMMAND_CONFIG,
  handler: U.cmdHandler(handler)
}
