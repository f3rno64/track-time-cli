import { type TimeSheet, type TimeSheetEntry } from '../types'

const findLastActiveSheetEntry = (sheet: TimeSheet): TimeSheetEntry | null => {
  const { entries: sheetEntries } = sheet
  const entries = [...sheetEntries]

  entries.sort(({ start: a }, { start: b }) => +b - +a)

  return entries[0] ?? null
}

export default findLastActiveSheetEntry
