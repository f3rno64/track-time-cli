import { type YArgsOptionDefinition } from '../types'

const DELETE_OPTION: YArgsOptionDefinition = [
  'delete',
  {
    describe: 'Delete the specified time sheet or time sheet entry',
    alias: ['d', 'del'],
    type: 'boolean'
  }
]

export default DELETE_OPTION
