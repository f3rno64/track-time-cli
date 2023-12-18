import _isDate from 'lodash/isDate'

const getStartOfDay = (date?: Date): Date => {
  const d = _isDate(date) ? date : new Date()

  d.setHours(0)
  d.setMinutes(0)
  d.setSeconds(0)
  d.setMilliseconds(0)

  return d
}

export default getStartOfDay
