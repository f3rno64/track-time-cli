import printSheet from './sheet'
import { type TimeSheet } from '../types'

const printSheets = (sheets: TimeSheet[], activeSheetName?: string): void => {
  sheets.forEach((sheet: TimeSheet, i: number): void => {
    printSheet(sheet, sheet.name === activeSheetName)

    if (i < sheets.length - 1) {
      console.log('')
    }
  })
}

export default printSheets
