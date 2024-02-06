import { type YArgsOptionDefinition } from '../types'

const TOTAL_OPTION: YArgsOptionDefinition = [
  'total',
  {
    alias: 't',
    describe: 'Display total duration for the week for all sheets',
    type: 'boolean'
  }
]

export default TOTAL_OPTION
