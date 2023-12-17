import _isDate from 'lodash/isDate'

const getStartOfHourDate = (hour: number, date?: Date): Date => {
  const d = _isDate(date) ? date : new Date()

  d.setHours(hour)
  d.setMinutes(0)
  d.setSeconds(0)
  d.setMilliseconds(0)

  return d
}

export default getStartOfHourDate
