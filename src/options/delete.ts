import { type YArgsOptionDefinition } from '../types'

const DELETE_OPTION: YArgsOptionDefinition = [
  'delete',
  {
    alias: ['d', 'del'],
    describe: 'Delete the specified time sheet or time sheet entry',
    type: 'boolean'
  }
]

export default DELETE_OPTION
