import { type YArgsOptionDefinition } from '../types'

const TOTAL_OPTION: YArgsOptionDefinition = [
  'total',
  {
    describe: 'Display total duration for the week for all sheets',
    alias: 't',
    type: 'boolean'
  }
]

export default TOTAL_OPTION
