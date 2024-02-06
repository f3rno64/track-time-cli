import log from '../log'
import { type TimeSheet } from '../types'
import printSheet from './sheet'

const printSheets = (
  sheets: TimeSheet[],
  printDateAgo?: boolean,
  humanize?: boolean,
  concise?: boolean
): void => {
  sheets.forEach((sheet: TimeSheet, i: number): void => {
    printSheet(sheet, false, printDateAgo, humanize, concise)

    if (i < sheets.length - 1) {
      log('')
    }
  })
}

export default printSheets
