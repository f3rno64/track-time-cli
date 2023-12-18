import colors from 'colors'

const clDuration = (input: string | number): string =>
  colors.green.bold(`${input}`)

export default clDuration
