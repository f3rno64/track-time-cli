import getDaysMS from './get_days_ms'

const getPastDay = (days: number): Date =>
  new Date(Date.now() - getDaysMS(days))

export default getPastDay
