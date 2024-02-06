import _isFinite from 'lodash/isFinite'

import { getEndOfHour, getStartOfHour } from '../dates'
import { type TimeSheetEntry } from '../types'

const getEntryDurationInHour = (
  entry: TimeSheetEntry,
  date: Date | number,
  hour: number
): number => {
  const { end, start } = entry

  const hourDate = _isFinite(date) ? new Date(date) : (date as Date)
  const hourDateStart = getStartOfHour(hour, hourDate)
  const hourDateEnd = getEndOfHour(hour, hourDate)

  if (+start < +hourDateStart && end !== null && +end < +hourDateStart) {
    return 0
  } else if (+start > +hourDateEnd) {
    return 0
  } else if (+start < +hourDateStart && end !== null && +end > +hourDateStart) {
    return +end - +hourDateStart
  } else if (+start < +hourDateStart && end === null) {
    return +hourDateEnd - +hourDateStart
  } else if (+start > +hourDateStart && end === null) {
    return +hourDateEnd - +start
  } else if (+start > +hourDateStart && end !== null && +end < +hourDateEnd) {
    return +end - +start
  }

  return 0
}

export default getEntryDurationInHour
