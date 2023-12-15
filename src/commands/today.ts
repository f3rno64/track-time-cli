import DB from '../db'
import * as U from '../utils'
import * as P from '../print'
import * as S from '../sheets'

const COMMAND_CONFIG = {
  command: 'today',
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
  ago: boolean
  all: boolean
}

const handler = (args: TodayCommandArguments) => {
  const { all, ago, db } = args
  const sheets = all ? db.getAllSheets() : [db.getActiveSheet()]
  const sheetsWithEntriesForToday = S.getSheetsWithEntriesSinceDate(
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
