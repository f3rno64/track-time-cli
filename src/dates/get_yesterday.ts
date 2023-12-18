import getPastDay from './get_past_day'

const getYesterday = (): Date => getPastDay(1)

export default getYesterday
