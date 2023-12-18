import getDaysMS from './get_days_ms'

const getFutureDay = (days: number): Date =>
  new Date(Date.now() + getDaysMS(days))

export default getFutureDay
