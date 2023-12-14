import _isDate from 'lodash/isDate'

const getEndDate = (date?: Date): Date => {
  const d = _isDate(date) ? new Date(+date) : new Date()

  d.setHours(23)
  d.setMinutes(59)
  d.setSeconds(59)
  d.setMilliseconds(999)

  return d
}

export default getEndDate
