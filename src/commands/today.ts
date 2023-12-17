import DB from '../db'
import * as U from '../utils'
import * as P from '../print'

const COMMAND_CONFIG = {
  command: 'today [sheets..]',
  describe: 'Display a summary of activity for today',
  aliases: ['t'],
  builder: {
    all: {
      describe: 'Include all time sheets in results',
      type: 'boolean'
    }
  }
}

interface TodayCommandArguments {
  db: DB
  ago?: boolean
  all?: boolean
  sheets?: string[]
}

const handler = (args: TodayCommandArguments) => {
  const { sheets: inputSheets, all, ago, db } = args

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

  P.printSummary(sheetsWithEntriesForToday, true)
  P.printSheets(sheetsWithEntriesForToday, ago)
}

export default {
  ...COMMAND_CONFIG,
  handler
}
