import * as D from '../dates'
import { type TimeSheetEntry } from '../types'

const isEntryForYesterday = (entry: TimeSheetEntry): boolean => {
  const { start, end } = entry
  const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000)
  const startOfYesterday = D.getStartOfDayDate(yesterday)
  const endOfYesterday = D.getEndOfDayDate(yesterday)

  return (
    +start >= +startOfYesterday && (end === null || +end <= +endOfYesterday)
  )
}

export default isEntryForYesterday
