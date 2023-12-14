import _isDate from 'lodash/isDate'

const getStartDate = (date?: Date): Date => {
  const d = _isDate(date) ? new Date(+date) : new Date()

  d.setHours(0)
  d.setMinutes(0)
  d.setSeconds(0)
  d.setMilliseconds(0)

  return d
}

export default getStartDate
