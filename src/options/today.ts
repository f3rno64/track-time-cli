import { type YArgsOptionDefinition } from '../types'

const TODAY_OPTION: YArgsOptionDefinition = [
  'today',
  {
    describe: 'Show results for today',
    alias: 't',
    type: 'boolean'
  }
]

export default TODAY_OPTION
