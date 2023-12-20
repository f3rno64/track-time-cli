import getHoursMS from './get_hours_ms'

const getPastHour = (hours: number): Date =>
  new Date(Date.now() - getHoursMS(hours))

export default getPastHour
