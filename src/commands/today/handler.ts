import log from '../../log'
import * as D from '../../dates'
import * as U from '../../utils'
import * as P from '../../print'
import { type TodayCommandArgs } from './types'

const handler = (args: TodayCommandArgs) => {
  const { humanize, sheets: inputSheets, all, ago, db } = args

  // prettier-ignore
  const sheets = all
    ? db.getAllSheets()
    : typeof inputSheets === 'undefined'
      ? [db.getActiveSheet()]
      : inputSheets.map((name: string) => db.getSheet(name))

  const sheetsWithEntriesForToday = U.getSheetsWithEntriesSinceDate(
    sheets,
    D.getStartOfDay()
  )

  if (sheetsWithEntriesForToday.length === 0) {
    throw new Error('No entries for today')
  }

  P.printSummary(sheetsWithEntriesForToday, humanize)
  log('')
  P.printSheets(sheetsWithEntriesForToday, ago, humanize)
}

export default handler
