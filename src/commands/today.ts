import DB from '../db'
import log from '../log'
import * as U from '../utils'
import * as P from '../print'
import * as O from '../options'

const COMMAND_CONFIG = {
  command: 'today [sheets..]',
  describe: 'Display a summary of activity for today',
  aliases: ['t'],
  builder: O.setup.bind(null, [
    O.SheetsOption,
    O.AgoOption,
    O.HumanizeOption,
    O.AllOption
  ])
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
