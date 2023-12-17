import getDaysMS from './get_days_ms'

const getPastDayDate = (days: number): Date =>
  new Date(Date.now() - getDaysMS(days))

export default getPastDayDate
