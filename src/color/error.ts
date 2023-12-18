import colors from 'colors'

const clError = (input: string | Error): string =>
  colors.red(typeof input === 'string' ? input : input.message)

export default clError
