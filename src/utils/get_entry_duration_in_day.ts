import _isFinite from 'lodash/isFinite'

import { type TimeSheetEntry } from '../types'
import { getEndOfDay, getStartOfDay } from '../dates'

const getEntryDurationInDay = (
  entry: TimeSheetEntry,
  day: Date | number
): number => {
  const { end, start } = entry

  const dayDate = _isFinite(day) ? new Date(day) : (day as Date)
  const dayDateStart = getStartOfDay(dayDate)
  const dayDateEnd = getEndOfDay(dayDate)

  if (+start < +dayDateStart && end !== null && +end < +dayDateStart) {
    return 0
  } else if (+start > +dayDateEnd) {
    return 0
  } else if (+start < +dayDateStart && end !== null && +end > +dayDateStart) {
    return +end - +dayDateStart
  } else if (+start < +dayDateStart && end === null) {
    return +dayDateEnd - +dayDateStart
  } else if (+start > +dayDateStart && end === null) {
    return +dayDateEnd - +start
  } else if (+start > +dayDateStart && end !== null && +end < +dayDateEnd) {
    return +end - +start
  }

  return 0
}

export default getEntryDurationInDay
