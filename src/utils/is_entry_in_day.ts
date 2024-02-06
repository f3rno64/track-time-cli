import { type TimeSheetEntry } from '../types'
import { getEndOfDay, getStartOfDay } from '../dates'

const isEntryInDay = (date: Date, entry: TimeSheetEntry): boolean => {
  const { end, start } = entry
  const startOfDay = getStartOfDay(date)
  const endOfDay = getEndOfDay(date)

  return (
    (+start >= +startOfDay && (end === null || +end <= +endOfDay)) ||
    (+start <= +startOfDay && (end === null || +end >= +startOfDay))
  )
}

export default isEntryInDay
