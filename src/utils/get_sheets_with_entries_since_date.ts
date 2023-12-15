import { type TimeSheet } from '../types'

const getSheetsWithEntriesSinceDate = (
  sheets: TimeSheet[],
  since: Date
): TimeSheet[] =>
  sheets
    .map(({ entries, ...otherSheetData }) => ({
      ...otherSheetData,
      entries: entries.filter(
        ({ start, end }) =>
          start >= since ||
          (start < since && end !== null && end >= since) ||
          (start < since && end === null)
      )
    }))
    .filter(({ entries }) => entries.length > 0)
    .map(({ entries, ...otherSheetData }) => ({
      ...otherSheetData,
      entries: entries.map(({ start, ...otherEntryData }) => ({
        start: start < since ? since : start,
        ...otherEntryData
      }))
    }))

export default getSheetsWithEntriesSinceDate