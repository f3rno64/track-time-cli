import { type YArgsOptionDefinition } from '../types'

const ABSOLUTE_OPTION: YArgsOptionDefinition = [
  'absolute',
  {
    alias: ['abs'],
    describe: 'Print dates as absolute timestamps',
    type: 'boolean'
  }
]

export default ABSOLUTE_OPTION
