import { type Argv } from 'yargs'

import DB from '../db'
import log from '../log'
import * as U from '../utils'
import * as P from '../print'

const COMMAND_CONFIG = {
  command: 'today [sheets..]',
  describe: 'Display a summary of activity for today',
  aliases: ['t'],
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

interface TodayCommandArguments {
  db: DB
  ago?: boolean
  all?: boolean
  sheets?: string[]
  humanize?: boolean
}

const handler = (args: TodayCommandArguments) => {
  const { humanize, sheets: inputSheets, all, ago, db } = args

  // prettier-ignore
  const sheets = all
    ? db.getAllSheets()
    : typeof inputSheets === 'undefined'
      ? [db.getActiveSheet()]
      : inputSheets.map((name: string) => db.getSheet(name))

  const sheetsWithEntriesForToday = U.getSheetsWithEntriesSinceDate(
    sheets,
    U.getStartDate()
  )

  if (sheetsWithEntriesForToday.length === 0) {
    throw new Error('No entries for today')
  }

  P.printSummary(sheetsWithEntriesForToday, humanize)
  log('')
  P.printSheets(sheetsWithEntriesForToday, ago, humanize)
}

export default {
  ...COMMAND_CONFIG,
  handler
}
