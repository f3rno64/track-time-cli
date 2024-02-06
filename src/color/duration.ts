import colors from 'colors'

const clDuration = (input: number | string): string =>
  colors.green.bold(`${input}`)

export default clDuration
