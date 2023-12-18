import getPastDayDate from './get_past_day_date'

const getYesterday = (): Date => getPastDayDate(1)

export default getYesterday
