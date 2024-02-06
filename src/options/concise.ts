import { type YArgsOptionDefinition } from '../types'

const CONCISE_OPTION: YArgsOptionDefinition = [
  'concise',
  {
    alias: ['c'],
    describe: 'Exclude start and end dates from output, showing duration only',
    type: 'boolean'
  }
]

export default CONCISE_OPTION
