import * as D from '../dates'
import { type TimeSheetEntry } from '../types'

const isEntryToday = (entry: TimeSheetEntry): boolean => {
  const { start, end } = entry
  const startOfToday = D.getStartOfDayDate()
  const endOfToday = D.getEndOfDayDate()

  return +start >= +startOfToday && (end === null || +end <= +endOfToday)
}

export default isEntryToday
