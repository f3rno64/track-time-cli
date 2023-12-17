import { type Argv } from 'yargs'

import DB from '../db'
import log from '../log'
import * as U from '../utils'
import * as P from '../print'
import { type TimeSheetEntry } from '../types'

const COMMAND_CONFIG = {
  command: 'yesterday [sheets..]',
  describe: 'Display a summary of activity for yesterday',
  aliases: ['y'],
  builder: (yargs: Argv) =>
    yargs
      .option('sheets', {
        describe: 'Show results for the specified sheets',
        type: 'array'
      })
      .option('ago', {
        description: 'Print dates as relative time (e.g. 5 minutes ago)',
        alias: ['r', 'relative'],
        type: 'boolean'
      })
      .option('humanize', {
        describe: 'Print the total duration in human-readable format',
        alias: 'h',
        type: 'boolean'
      })
      .option('all', {
        describe: 'Include all time sheets in results',
        alias: 'a',
        type: 'boolean'
      })
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
  const startOfYesterday = U.getStartDate(yesterday)
  const endOfYesterday = U.getEndDate(yesterday)

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
