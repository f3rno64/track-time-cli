import _isDate from 'lodash/isDate'

const getStartDate = (date?: Date): Date => {
  const d = _isDate(date) ? new Date(+date) : new Date()

  d.setUTCHours(0)
  d.setUTCMinutes(0)
  d.setUTCSeconds(0)
  d.setUTCMilliseconds(0)

  return d
}

export default getStartDate
