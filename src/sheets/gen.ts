import { type TimeSheetEntry, type TimeSheet } from 'types'

const genSheet = (
  name: string,
  entries: TimeSheetEntry[] = [],
  activeEntryID: number | null = null
): TimeSheet => ({
  name,
  entries,
  activeEntryID
})

export default genSheet
