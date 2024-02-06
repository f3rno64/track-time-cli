import colors from 'colors'
import _isNumber from 'lodash/isNumber'
import _isString from 'lodash/isString'

const clDate = (input: Date | number | string): string => {
  const dateString = _isString(input)
    ? input
    : _isNumber(input)
      ? new Date(input).toLocaleString()
      : (input as unknown as string)

  return colors.magenta(dateString)
}

export default clDate
