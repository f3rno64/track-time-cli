import { type YArgsOptionDefinition } from '../types'

const NAME_OPTION: YArgsOptionDefinition = [
  'name',
  {
    describe: 'New name to apply to specified time sheet',
    alias: 'n',
    type: 'string'
  }
]

export default NAME_OPTION
