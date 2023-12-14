import * as P from '../print'
import * as S from '../sheets'
import { type TimeTrackerDB } from '../types'

const COMMAND_CONFIG = {
  command: 'today',
  describe: 'Display a summary of activity for today',
  aliases: ['t']
}

interface TodayCommandArguments {
  db: TimeTrackerDB
  ago: boolean
}

const handler = (args: TodayCommandArguments) => {
  const { ago, db } = args
  const { sheets } = db
  const sheetsWithEntriesForToday = S.filterWithEntriesForToday(sheets)

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
