import { type TimeSheetEntry, type TimeSheet } from '../types'

const findSheetEntry = (
  sheet: TimeSheet,
  entry: TimeSheetEntry | number
): TimeSheetEntry | undefined => {
  const { entries } = sheet
  const entryID = typeof entry === 'number' ? entry : entry.id

  return entries.find(({ id }) => id === entryID)
}

export default findSheetEntry
