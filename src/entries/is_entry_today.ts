import * as U from '../utils'
import { type TimeSheetEntry } from '../types'

const isEntryToday = (entry: TimeSheetEntry): boolean => {
  const { start, end } = entry
  const startOfToday = U.getStartDate()
  const endOfToday = U.getEndDate()

  return +start >= +startOfToday && (end === null || +end <= +endOfToday)
}

export default isEntryToday
