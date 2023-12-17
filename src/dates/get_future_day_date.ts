import getDaysMS from './get_days_ms'

const getFutureDayDate = (days: number): Date =>
  new Date(Date.now() + getDaysMS(days))

export default getFutureDayDate
