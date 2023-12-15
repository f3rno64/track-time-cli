import _isArray from 'lodash/isArray'

const parseVariadicArg = (arg: string | string[] | undefined) => {
  if (typeof arg === 'undefined') {
    return undefined
  }

  return _isArray(arg) ? arg.join(' ') : arg
}

export default parseVariadicArg
