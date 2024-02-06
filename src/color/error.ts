import colors from 'colors'
import _isString from 'lodash/isString'

const clError = (input: Error | string): string =>
  colors.red(_isString(input) ? input : input.message)

export default clError
