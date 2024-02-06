import { type TimeSheet } from '../types'
import { getDaysMS, getEndOfDay, getStartOfDay } from '../dates'

const getSheetsWithEntriesInLastWeek = (sheets: TimeSheet[]) => {
  const date = new Date(Date.now() - getDaysMS(7))
  const startOfOneWeekAgo = getStartOfDay(date)
  const endOfToday = getEndOfDay()

  // prettier-ignore
  return sheets
    .map(({ entries, ...otherSheetData }) => ({
      entries: entries.filter(
        ({ end, start }) => (
          (+start >= +startOfOneWeekAgo) &&
          (end === null || +end <= +endOfToday)
        )
      ),
      ...otherSheetData
    }))
    .filter(({ entries }) => entries.length > 0)
}

export default getSheetsWithEntriesInLastWeek
