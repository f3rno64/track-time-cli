import * as P from '../print'
import { type TimeSheet, type TimeSheetEntry } from '../types'

const printSheet = (
  sheet: TimeSheet,
  isActive?: boolean,
  printDateAgo?: boolean
): void => {
  const { activeEntryID, entries } = sheet

  P.printSheetHeader(sheet, isActive)

  const sheetEntryRows = entries.map((entry: TimeSheetEntry): string[] =>
    P.getSheetEntryColumns(entry, entry.id === activeEntryID, '', printDateAgo)
  )

  P.printJustifiedContent(sheetEntryRows)
}

export default printSheet
