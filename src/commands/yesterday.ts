import DB from '../db'
import log from '../log'
import * as P from '../print'
import * as D from '../dates'
import * as O from '../options'
import { type TimeSheetEntry } from '../types'

const COMMAND_CONFIG = {
  command: 'yesterday [sheets..]',
  describe: 'Display a summary of activity for yesterday',
  aliases: ['y'],
  builder: O.setup.bind(null, [
    O.SheetsOption,
    O.AgoOption,
    O.HumanizeOption,
    O.AllOption
  ])
}

interface YesterdayCommandArguments {
  db: DB
  sheets?: string[]
  all?: boolean
  ago?: boolean
  humanize?: boolean
}

const isEntryForYesterday = (entry: TimeSheetEntry): boolean => {
  const { start, end } = entry
  const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000)
  const startOfYesterday = D.getStartOfDayDate(yesterday)
  const endOfYesterday = D.getEndOfDayDate(yesterday)

  return (
    +start >= +startOfYesterday && (end === null || +end <= +endOfYesterday)
  )
}

const handler = (args: YesterdayCommandArguments) => {
  const { ago, humanize, all, sheets: inputSheets, db } = args

  if (typeof inputSheets !== 'undefined' && all) {
    throw new Error('Cannot specify both --all and sheets')
  }

  const sheets =
    typeof inputSheets === 'undefined' || all
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

  P.printSummary(sheetsWithEntriesForYesterday, humanize)
  log('')
  P.printSheets(sheetsWithEntriesForYesterday, ago, humanize)
}

export default {
  ...COMMAND_CONFIG,
  handler
}
