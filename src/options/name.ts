import { type YArgsOptionDefinition } from '../types'

const NAME_OPTION: YArgsOptionDefinition = [
  'name',
  {
    alias: 'n',
    describe: 'New name to apply to specified time sheet',
    type: 'string'
  }
]

export default NAME_OPTION
