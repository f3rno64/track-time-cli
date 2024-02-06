import _isArray from 'lodash/isArray'
import _isUndefined from 'lodash/isUndefined'

const parseVariadicArg = (arg: string | string[] | undefined) => {
  if (_isUndefined(arg)) {
    return undefined
  }

  return _isArray(arg) ? arg.join(' ') : arg
}

export default parseVariadicArg
