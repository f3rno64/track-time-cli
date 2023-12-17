import log from '../../log'
import * as U from '../../utils'
import * as P from '../../print'
import { type YesterdayCommandArgs } from './types'

const handler = (args: YesterdayCommandArgs) => {
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
      entries: entries.filter(U.isEntryForYesterday),
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

export default handler
