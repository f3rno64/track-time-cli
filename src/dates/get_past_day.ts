import getDaysMS from './get_days_ms'

const getPastDay = (days?: number): Date =>
  new Date(Date.now() - getDaysMS(days ?? 1))

export default getPastDay
