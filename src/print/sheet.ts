import {
  getSheetEntryColumns,
  printJustifiedContent,
  printSheetHeader
} from '../print'
import { type TimeSheet, type TimeSheetEntry } from '../types'

const printSheet = (
  sheet: TimeSheet,
  isActive?: boolean,
  printDateAgo?: boolean,
  humanize?: boolean,
  concise?: boolean
): void => {
  const { activeEntryID, entries } = sheet

  printSheetHeader(sheet, isActive)

  const sheetEntryRows = entries.map((entry: TimeSheetEntry): string[] =>
    getSheetEntryColumns(
      entry,
      entry.id === activeEntryID,
      '',
      printDateAgo,
      humanize,
      concise
    )
  )

  printJustifiedContent(sheetEntryRows)
}

export default printSheet
