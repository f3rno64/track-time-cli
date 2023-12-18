import colors from 'colors'

const clDate = (input: string | number | Date): string => {
  // prettier-ignore
  const dateString = typeof input === 'string'
    ? new Date(input).toLocaleString()
    : typeof input === 'number'
      ? new Date(input).toLocaleString()
      : input as unknown as string

  return colors.magenta(dateString)
}

export default clDate
