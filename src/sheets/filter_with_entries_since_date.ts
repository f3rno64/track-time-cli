import { type TimeSheet } from '../types'

const filterWithEntriesSinceDate = (
  sheets: TimeSheet[],
  date: Date
): TimeSheet[] =>
  sheets
    .map((sheet: TimeSheet): TimeSheet => {
      const { entries, ...otherSheetData } = sheet
      const filteredEntries = entries.filter(({ start }) => start >= date)

      return {
        ...otherSheetData,
        entries: filteredEntries
      }
    })
    .filter(({ entries }) => entries.length > 0)

export default filterWithEntriesSinceDate
