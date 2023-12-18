import * as D from '../dates'
import { type TimeSheet } from '../types'

const getSheetsWithEntriesInLastWeek = (sheets: TimeSheet[]) => {
  const date = new Date(Date.now() - D.getDaysMS(7))
  const startOfOneWeekAgo = D.getStartOfDay(date)
  const endOfToday = D.getEndOfDay()

  // prettier-ignore
  return sheets
    .map(({ entries, ...otherSheetData }) => ({
      entries: entries.filter(
        ({ start, end }) => (
          (+start >= +startOfOneWeekAgo) &&
          (end === null || +end <= +endOfToday)
        )
      ),
      ...otherSheetData
    }))
    .filter(({ entries }) => entries.length > 0)
}

export default getSheetsWithEntriesInLastWeek
