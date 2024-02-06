import { type YArgsOptionDefinition } from '../types'

const TODAY_OPTION: YArgsOptionDefinition = [
  'today',
  {
    alias: 't',
    describe: 'Show results for today',
    type: 'boolean'
  }
]

export default TODAY_OPTION
