import _isFinite from 'lodash/isFinite'

import * as D from '../dates'
import { type TimeSheetEntry } from '../types'

const getEntryDurationInDay = (
  entry: TimeSheetEntry,
  day: Date | number
): number => {
  const { start, end } = entry

  const dayDate = _isFinite(day) ? new Date(day) : (day as Date)
  const dayDateStart = D.getStartOfDayDate(dayDate)
  const dayDateEnd = D.getEndOfDayDate(dayDate)

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
