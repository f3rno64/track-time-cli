import _isUndefined from 'lodash/isUndefined'

import log from '../../log'
import { TimeSheet } from '../../types'
import { getYesterday } from '../../dates'
import { type YesterdayCommandArgs } from './types'
import { printSheets, printSummary } from '../../print'
import { filterSheetEntriesForDate } from '../../sheets'

const handler = (args: YesterdayCommandArgs) => {
  const { all, db, help, humanize, absolute, sheets: inputSheets, yargs } = args

  if (help) {
    yargs.showHelp()
    process.exit(0)
  }

  if (!_isUndefined(inputSheets) && all) {
    throw new Error('Cannot specify both --all and sheets')
  }

  const sheets =
    _isUndefined(inputSheets) || all
      ? db.getAllSheets()
      : inputSheets.map((name: string): TimeSheet => db.getSheet(name))

  const yesterday = getYesterday()
  const sheetsWithEntriesForYesterday = filterSheetEntriesForDate(
    sheets,
    yesterday
  )

  if (sheetsWithEntriesForYesterday.length === 0) {
    throw new Error('No entries for yesterday')
  }

  printSummary(sheetsWithEntriesForYesterday, humanize)
  log('')
  printSheets(sheetsWithEntriesForYesterday, absolute !== true, humanize)
}

export default handler
