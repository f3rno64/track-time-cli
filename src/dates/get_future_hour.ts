import getHoursMS from './get_hours_ms'

const getFutureHour = (hours: number): Date =>
  new Date(Date.now() + getHoursMS(hours))

export default getFutureHour
