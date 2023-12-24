import log from '../../log'
import * as D from '../../dates'
import * as P from '../../print'
import * as S from '../../sheets'
import { type YesterdayCommandArgs } from './types'

const handler = (args: YesterdayCommandArgs) => {
  const { help, yargs, ago, humanize, all, sheets: inputSheets, db } = args

  if (help) {
    yargs.showHelp()
    process.exit(0)
  }

  if (typeof inputSheets !== 'undefined' && all) {
    throw new Error('Cannot specify both --all and sheets')
  }

  const sheets =
    typeof inputSheets === 'undefined' || all
      ? db.getAllSheets()
      : inputSheets.map(db.getSheet)

  const yesterday = D.getYesterday()
  const sheetsWithEntriesForYesterday = S.filterSheetEntriesForDate(
    sheets,
    yesterday
  )

  if (sheetsWithEntriesForYesterday.length === 0) {
    throw new Error('No entries for yesterday')
  }

  P.printSummary(sheetsWithEntriesForYesterday, humanize)
  log('')
  P.printSheets(sheetsWithEntriesForYesterday, ago, humanize)
}

export default handler
