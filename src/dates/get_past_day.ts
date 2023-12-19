import getDaysMS from './get_days_ms'

const DEFAULT_DAYS = 1

const getPastDay = (days?: number): Date =>
  new Date(Date.now() - getDaysMS(days ?? DEFAULT_DAYS))

export default getPastDay
