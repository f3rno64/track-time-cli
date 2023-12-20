import log from '../log'
import printSheet from './sheet'
import { type TimeSheet } from '../types'

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
