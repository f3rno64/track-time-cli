import { type TimeSheet } from '../types'

const getSheetsWithEntriesSinceDate = (
  sheets: TimeSheet[],
  since: Date
): TimeSheet[] =>
  sheets
    .map(({ entries, ...otherSheetData }) => ({
      ...otherSheetData,
      entries: entries.filter(
        ({ end, start }) =>
          start >= since ||
          (start < since && end !== null && end >= since) ||
          (start < since && end === null)
      )
    }))
    .filter(({ entries }) => entries.length > 0)

export default getSheetsWithEntriesSinceDate
