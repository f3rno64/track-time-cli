import * as D from '../dates'
import { type TimeSheet } from '../types'

const getSheetsWithEntriesInLastWeek = (sheets: TimeSheet[]) => {
  const date = new Date(
    +D.getStartOfDayDate(new Date(Date.now() - D.getDaysMS(7)))
  )

  const startOfOneWeekAgo = D.getStartOfDayDate(date)
  const endOfToday = D.getEndOfDayDate()

  return sheets
    .filter(({ entries }) => entries.length > 0)
    .map(({ entries, ...otherSheetData }) => ({
      entries: entries
        .map(({ end, ...entryData }) => ({
          end: end === null ? new Date() : end,
          ...entryData
        }))
        .filter(
          ({ start, end }) =>
            +start >= +startOfOneWeekAgo && +end <= +endOfToday
        ),
      ...otherSheetData
    }))
}

export default getSheetsWithEntriesInLastWeek
