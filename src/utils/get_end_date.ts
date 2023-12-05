import _isDate from 'lodash/isDate'

const getEndDate = (date?: Date): Date => {
  const d = _isDate(date) ? new Date(+date) : new Date()

  d.setUTCHours(23)
  d.setUTCMinutes(59)
  d.setUTCSeconds(59)
  d.setUTCMilliseconds(999)

  return d
}

export default getEndDate
