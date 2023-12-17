import _isDate from 'lodash/isDate'

const getEndOfHourDate = (hour: number, date?: Date): Date => {
  const d = _isDate(date) ? date : new Date()

  d.setHours(hour)
  d.setMinutes(59)
  d.setSeconds(59)
  d.setMilliseconds(999)

  return d
}

export default getEndOfHourDate
