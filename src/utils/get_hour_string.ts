const getHourString = (hour: number): string =>
  hour > 11 ? `${hour - 11}pm` : `${hour + 1}am`

export default getHourString
